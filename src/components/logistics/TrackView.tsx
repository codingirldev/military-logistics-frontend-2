'use client';

import { useState } from 'react';
import { Package, Truck } from 'lucide-react';
import type { Crate, Track } from '@/types/logistics';
import CheckpointForm from './CheckpointForm';

interface TrackViewProps {
  track: Track;
  onCrateClick?: (crate: Crate) => void;
}

export default function TrackView({ track, onCrateClick }: TrackViewProps) {
  const [selectedCrate, setSelectedCrate] = useState<Crate | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCrateClick = (crate: Crate) => {
    setSelectedCrate(crate);
    setShowForm(true);
    if (onCrateClick) {
      onCrateClick(crate);
    }
  };

  const getStatusColor = (status: Crate['status']) => {
    switch (status) {
      case 'Loaded':
        return 'bg-[#5E725A]';
      case 'In Transit':
        return 'bg-[#C0A66B]';
      case 'Verified':
        return 'bg-[#708C6E]';
      case 'Delivered':
        return 'bg-[#6B7280]';
      default:
        return 'bg-[#3A4754]';
    }
  };

  const getStatusIcon = (status: Crate['status']) => {
    switch (status) {
      case 'Loaded':
        return '📦';
      case 'In Transit':
        return '🚚';
      case 'Verified':
        return '✓';
      case 'Delivered':
        return '✓✓';
      default:
        return '📦';
    }
  };

  // Create a grid representation (5x5 for visualization)
  const gridSize = 5;
  const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

  // Place crates on grid
  track.crates.forEach(crate => {
    if (crate.position.row < gridSize && crate.position.col < gridSize) {
      grid[crate.position.row][crate.position.col] = crate;
    }
  });

  return (
    <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
      {/* Track Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8 text-[#5E725A]" />
          <div>
            <h2 className="text-2xl font-bold text-[#E1E3E4]">{track.name}</h2>
            <p className="text-[#9CA3AF] text-sm">
              Status: <span className="text-[#5E725A] font-semibold">{track.status}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#9CA3AF] text-sm uppercase tracking-wide">Crates</p>
          <p className="text-[#E1E3E4] text-2xl font-bold">{track.crates.length}</p>
        </div>
      </div>

      {/* Grid Visualization */}
      <div className="mb-6">
        <h3 className="text-sm text-[#C0A66B] uppercase tracking-wide mb-3 font-semibold">
          Top-Down View
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {grid.map((row, rowIndex) =>
            row.map((crate, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square rounded border-2 border-[#3A4754] flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                  crate ? `${getStatusColor(crate.status)} border-[#5E725A]` : 'bg-[#1E252F]'
                }`}
                onClick={() => crate && handleCrateClick(crate)}
                title={crate ? `${crate.id} - ${crate.status}` : 'Empty slot'}
              >
                {crate ? (
                  <div className="text-center">
                    <div className="text-2xl mb-1">{getStatusIcon(crate.status)}</div>
                    <div className="text-xs font-mono text-[#E1E3E4]">
                      {crate.id.split('-')[1]}
                    </div>
                  </div>
                ) : (
                  <div className="text-[#3A4754] text-xs">•</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Crate List */}
      <div>
        <h3 className="text-sm text-[#C0A66B] uppercase tracking-wide mb-3 font-semibold">
          Crate Details
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {track.crates.map((crate) => (
            <div
              key={crate.id}
              className="bg-[#1E252F] border border-[#3A4754] rounded p-3 flex items-center justify-between hover:bg-[#2A3542] hover:border-[#5E725A] transition-colors cursor-pointer"
              onClick={() => handleCrateClick(crate)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(crate.status)}`} />
                <div>
                  <p className="text-[#E1E3E4] font-mono text-sm">{crate.id}</p>
                  <p className="text-[#9CA3AF] text-xs">{crate.unitName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#9CA3AF] text-xs uppercase tracking-wide">{crate.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkpoint Form Modal */}
      {showForm && selectedCrate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto">
            <CheckpointForm
              crateId={selectedCrate.id}
              trackId={track.id}
              unitName={selectedCrate.unitName}
              onSuccess={(checkpoint) => {
                console.log('Checkpoint recorded:', checkpoint);
                setShowForm(false);
                setSelectedCrate(null);
              }}
              onClose={() => {
                setShowForm(false);
                setSelectedCrate(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
