'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { blockchainService } from '@/services/blockchain';
import type { Checkpoint } from '@/types/logistics';

export default function AuditorPanel() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [auditorNotes, setAuditorNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    loadCheckpoints();
  }, []);

  const loadCheckpoints = async () => {
    setLoading(true);
    try {
      const data = await blockchainService.getCheckpointHistory();
      setCheckpoints(data);
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (checkpoint: Checkpoint) => {
    setVerifying(true);
    try {
      const isValid = await blockchainService.verifyCheckpoint(checkpoint.id);
      
      if (isValid) {
        // Update checkpoint as verified
        setCheckpoints(prev =>
          prev.map(cp =>
            cp.id === checkpoint.id
              ? { ...cp, verified: true, flagged: false, auditorNotes }
              : cp
          )
        );
        setSelectedCheckpoint(null);
        setAuditorNotes('');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setVerifying(false);
    }
  };

  const handleFlag = (checkpoint: Checkpoint) => {
    setCheckpoints(prev =>
      prev.map(cp =>
        cp.id === checkpoint.id
          ? { ...cp, flagged: true, verified: false, auditorNotes }
          : cp
      )
    );
    setSelectedCheckpoint(null);
    setAuditorNotes('');
  };

  const getVerificationStats = () => {
    const total = checkpoints.length;
    const verified = checkpoints.filter(cp => cp.verified && !cp.flagged).length;
    const flagged = checkpoints.filter(cp => cp.flagged).length;
    const pending = total - verified - flagged;

    return { total, verified, flagged, pending };
  };

  const stats = getVerificationStats();

  if (loading) {
    return (
      <div className="bg-[#212830] border border-[#3A4754] rounded p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E725A] mx-auto mb-4"></div>
        <p className="text-[#9CA3AF]">Loading audit data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-[#5E725A]" />
          <div>
            <h2 className="text-2xl font-bold text-[#E1E3E4]">Auditor Dashboard</h2>
            <p className="text-[#9CA3AF] text-sm">Verify and audit checkpoint records</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1E252F] border border-[#3A4754] rounded p-4">
            <p className="text-[#9CA3AF] text-xs uppercase tracking-wide mb-1">Total</p>
            <p className="text-[#E1E3E4] text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#708C6E]/30 border border-[#708C6E] rounded p-4 glow-success">
            <p className="text-[#708C6E] text-xs uppercase tracking-wide mb-1">Verified</p>
            <p className="text-[#708C6E] text-2xl font-bold">{stats.verified}</p>
          </div>
          <div className="bg-[#C0A66B]/20 border border-[#C0A66B]/50 rounded p-4">
            <p className="text-[#C0A66B] text-xs uppercase tracking-wide mb-1">Pending</p>
            <p className="text-[#C0A66B] text-2xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded p-4">
            <p className="text-red-400 text-xs uppercase tracking-wide mb-1">Flagged</p>
            <p className="text-red-400 text-2xl font-bold">{stats.flagged}</p>
          </div>
        </div>
      </div>

      {/* Checkpoints List */}
      <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
        <h3 className="text-lg font-semibold text-[#E1E3E4] mb-4">Checkpoints Pending Review</h3>
        <div className="space-y-3">
          {checkpoints
            .filter(cp => !cp.verified && !cp.flagged)
            .map((checkpoint) => (
              <div
                key={checkpoint.id}
                className="bg-[#1E252F] border border-[#3A4754] rounded p-4 hover:border-[#5E725A] transition-colors cursor-pointer"
                onClick={() => setSelectedCheckpoint(checkpoint)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E1E3E4] font-mono text-sm mb-1">
                      {checkpoint.trackId} / {checkpoint.crateId}
                    </p>
                    <p className="text-[#9CA3AF] text-xs">
                      {new Date(checkpoint.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#9CA3AF] text-xs mb-1">{checkpoint.operator}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-[#C0A66B]/20 text-[#C0A66B] border border-[#C0A66B]/50">
                      <AlertTriangle className="w-3 h-3" />
                      Pending Review
                    </span>
                  </div>
                </div>
              </div>
            ))}
          
          {checkpoints.filter(cp => !cp.verified && !cp.flagged).length === 0 && (
            <p className="text-center text-[#9CA3AF] py-8">All checkpoints have been reviewed</p>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCheckpoint && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#212830] border border-[#3A4754] rounded p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#E1E3E4]">Checkpoint Details</h3>
              <button
                onClick={() => {
                  setSelectedCheckpoint(null);
                  setAuditorNotes('');
                }}
                className="text-[#9CA3AF] hover:text-[#E1E3E4] transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                  <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Track ID</p>
                  <p className="text-[#E1E3E4] font-mono">{selectedCheckpoint.trackId}</p>
                </div>
                <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                  <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Crate ID</p>
                  <p className="text-[#E1E3E4] font-mono">{selectedCheckpoint.crateId}</p>
                </div>
              </div>

              <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Unit</p>
                <p className="text-[#E1E3E4]">{selectedCheckpoint.unitName}</p>
              </div>

              <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Location</p>
                <p className="text-[#E1E3E4] font-mono text-sm">
                  {selectedCheckpoint.geolocation.latitude.toFixed(6)}, {selectedCheckpoint.geolocation.longitude.toFixed(6)}
                </p>
              </div>

              <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Report</p>
                <p className="text-[#E1E3E4]">{selectedCheckpoint.report}</p>
              </div>

              <div className="bg-[#1E252F] p-4 rounded border border-[#3A4754]">
                <p className="text-xs text-[#C0A66B] uppercase tracking-wide mb-1">Transaction Hash</p>
                <p className="text-[#E1E3E4] font-mono text-sm break-all">
                  {selectedCheckpoint.transactionHash || 'N/A'}
                </p>
              </div>

              <div>
                <label className="text-xs text-[#C0A66B] uppercase tracking-wide mb-2 block flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Auditor Notes
                </label>
                <textarea
                  value={auditorNotes}
                  onChange={(e) => setAuditorNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1E252F] border border-[#3A4754] rounded px-4 py-2 text-[#E1E3E4] focus:outline-none focus:border-[#5E725A] transition-colors resize-none placeholder-[#6B7280]"
                  placeholder="Add verification notes..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleVerify(selectedCheckpoint)}
                disabled={verifying}
                className="flex-1 bg-[#5E725A] hover:bg-[#4A5E43] disabled:bg-[#3A4754] disabled:cursor-not-allowed text-[#E1E3E4] font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Verify & Approve
              </button>
              <button
                onClick={() => handleFlag(selectedCheckpoint)}
                disabled={verifying}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-[#3A4754] disabled:cursor-not-allowed text-[#E1E3E4] font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Flag Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
