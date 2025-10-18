'use client';

import { useState } from 'react';
import { LayoutDashboard, Package, FileCheck, Shield, Menu, X } from 'lucide-react';
import TrackView from '@/components/logistics/TrackView';
import CheckpointTable from '@/components/logistics/CheckpointTable';
import AuditorPanel from '@/components/logistics/AuditorPanel';
import type { Track, Crate } from '@/types/logistics';

// Mock data for tracks and crates
const mockTracks: Track[] = [
  {
    id: 'TR-001',
    name: 'Alpha Convoy',
    status: 'In Transit',
    crates: [
      {
        id: 'CR-001',
        trackId: 'TR-001',
        unitName: 'Alpha Company',
        status: 'Loaded',
        position: { row: 0, col: 0 },
        color: 'blue'
      },
      {
        id: 'CR-002',
        trackId: 'TR-001',
        unitName: 'Bravo Company',
        status: 'In Transit',
        position: { row: 0, col: 1 },
        color: 'yellow'
      },
      {
        id: 'CR-003',
        trackId: 'TR-001',
        unitName: 'Charlie Company',
        status: 'Loaded',
        position: { row: 0, col: 2 },
        color: 'blue'
      },
      {
        id: 'CR-004',
        trackId: 'TR-001',
        unitName: 'Delta Company',
        status: 'Verified',
        position: { row: 1, col: 0 },
        color: 'green'
      },
      {
        id: 'CR-005',
        trackId: 'TR-001',
        unitName: 'Echo Company',
        status: 'In Transit',
        position: { row: 1, col: 1 },
        color: 'yellow'
      }
    ]
  },
  {
    id: 'TR-002',
    name: 'Bravo Convoy',
    status: 'Active',
    crates: [
      {
        id: 'CR-006',
        trackId: 'TR-002',
        unitName: 'Foxtrot Company',
        status: 'Loaded',
        position: { row: 0, col: 0 },
        color: 'blue'
      },
      {
        id: 'CR-007',
        trackId: 'TR-002',
        unitName: 'Golf Company',
        status: 'Loaded',
        position: { row: 0, col: 1 },
        color: 'blue'
      }
    ]
  }
];

type View = 'dashboard' | 'tracks' | 'checkpoints' | 'auditor';

export default function LogisticsPage() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTrack, setSelectedTrack] = useState<Track>(mockTracks[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCrateClick = (crate: Crate) => {
    console.log('Crate clicked:', crate);
  };

  return (
    <div className="min-h-screen bg-[#1E252F] text-[#E2E2E2] relative overflow-hidden">
      {/* Header */}
      <header className="bg-[#212830] border-b border-[#3A4754] px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-[#9CA3AF] hover:text-[#C0A66B] transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold text-[#E1E3E4] flex items-center gap-2">
              <Package className="w-7 h-7 text-[#C0A66B]" />
              <span>
                <span className="text-white">Military</span>{' '}
                <span className="text-[#5E725A]">Logistics</span>{' '}
                <span className="text-[#C0A66B]">Checkpoint</span>
              </span>
            </h1>
          </div>
          <div className="text-sm text-[#9CA3AF]">
            System Status: <span className="text-[#5E725A] font-semibold">●</span> <span className="text-[#5E725A]">OPERATIONAL</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)] relative z-10">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 w-64 bg-[#212830] border-r border-[#3A4754] transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                currentView === 'dashboard'
                  ? 'bg-[#5E725A] text-[#E1E3E4]'
                  : 'text-[#9CA3AF] hover:bg-[#2A3542]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>

            <button
              onClick={() => setCurrentView('tracks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                currentView === 'tracks'
                  ? 'bg-[#5E725A] text-[#E1E3E4]'
                  : 'text-[#9CA3AF] hover:bg-[#2A3542]'
              }`}
            >
              <Package className="w-5 h-5" />
              Track View
            </button>

            <button
              onClick={() => setCurrentView('checkpoints')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                currentView === 'checkpoints'
                  ? 'bg-[#5E725A] text-[#E1E3E4]'
                  : 'text-[#9CA3AF] hover:bg-[#2A3542]'
              }`}
            >
              <FileCheck className="w-5 h-5" />
              Checkpoints
            </button>

            <button
              onClick={() => setCurrentView('auditor')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                currentView === 'auditor'
                  ? 'bg-[#5E725A] text-[#E1E3E4]'
                  : 'text-[#9CA3AF] hover:bg-[#2A3542]'
              }`}
            >
              <Shield className="w-5 h-5" />
              Auditor Panel
            </button>
          </nav>

          {/* Track List */}
          <div className="p-4 border-t border-[#3A4754]">
            <h3 className="text-xs text-[#C0A66B] uppercase tracking-wide mb-3 px-4 font-semibold">
              Active Tracks
            </h3>
            <div className="space-y-2">
              {mockTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrack(track);
                    setCurrentView('tracks');
                  }}
                  className={`w-full text-left px-4 py-3 rounded transition-all duration-300 ${
                    selectedTrack.id === track.id
                      ? 'bg-[#2A3542] border border-[#C0A66B]'
                      : 'text-[#9CA3AF] hover:bg-[#2A3542]'
                  }`}
                >
                  <p className="font-semibold text-sm">{track.name}</p>
                  <p className="text-xs text-[#6B7280]">{track.id}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-[#C0A66B] tracking-tight">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
                    <p className="text-[#9CA3AF] text-sm mb-2 uppercase tracking-wide">Active Tracks</p>
                    <p className="text-4xl font-bold text-[#C0A66B]">{mockTracks.length}</p>
                  </div>
                  <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
                    <p className="text-[#9CA3AF] text-sm mb-2 uppercase tracking-wide">Total Crates</p>
                    <p className="text-4xl font-bold text-[#5E725A]">
                      {mockTracks.reduce((sum, track) => sum + track.crates.length, 0)}
                    </p>
                  </div>
                  <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
                    <p className="text-[#9CA3AF] text-sm mb-2 uppercase tracking-wide">In Transit</p>
                    <p className="text-4xl font-bold text-[#C0A66B]">
                      {mockTracks
                        .flatMap(t => t.crates)
                        .filter(c => c.status === 'In Transit').length}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#E1E3E4]">Recent Activity</h3>
                <CheckpointTable />
              </div>
            </div>
          )}

          {currentView === 'tracks' && (
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#C0A66B] tracking-tight">
                Track Visualization
              </h2>
              <TrackView track={selectedTrack} onCrateClick={handleCrateClick} />
            </div>
          )}

          {currentView === 'checkpoints' && (
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#C0A66B] tracking-tight">
                Checkpoint Records
              </h2>
              <CheckpointTable />
            </div>
          )}

          {currentView === 'auditor' && (
            <div>
              <AuditorPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
