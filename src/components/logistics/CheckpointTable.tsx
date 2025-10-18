'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { blockchainService } from '@/services/blockchain';
import type { Checkpoint } from '@/types/logistics';

interface CheckpointTableProps {
  crateId?: string;
  trackId?: string;
}

export default function CheckpointTable({ crateId, trackId }: CheckpointTableProps) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [filteredCheckpoints, setFilteredCheckpoints] = useState<Checkpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'crate' | 'track'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'flagged'>('all');

  useEffect(() => {
    loadCheckpoints();
  }, [crateId, trackId]);

  useEffect(() => {
    filterAndSortCheckpoints();
  }, [checkpoints, searchTerm, sortBy, filterStatus]);

  const loadCheckpoints = async () => {
    setLoading(true);
    try {
      const data = await blockchainService.getCheckpointHistory(crateId, trackId);
      setCheckpoints(data);
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCheckpoints = () => {
    let filtered = [...checkpoints];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        cp =>
          cp.crateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cp.trackId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cp.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cp.report.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus === 'verified') {
      filtered = filtered.filter(cp => cp.verified && !cp.flagged);
    } else if (filterStatus === 'flagged') {
      filtered = filtered.filter(cp => cp.flagged);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.timestamp - a.timestamp;
        case 'crate':
          return a.crateId.localeCompare(b.crateId);
        case 'track':
          return a.trackId.localeCompare(b.trackId);
        default:
          return 0;
      }
    });

    setFilteredCheckpoints(filtered);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (checkpoint: Checkpoint) => {
    if (checkpoint.flagged) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-900/30 text-red-400 border border-red-700">
          <AlertTriangle className="w-3 h-3" />
          Flagged
        </span>
      );
    }
    if (checkpoint.verified) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-[#5E725A] text-[#E1E3E4]">
          <CheckCircle className="w-3 h-3" />
          Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-[#C0A66B]/20 text-[#C0A66B]">
        <XCircle className="w-3 h-3" />
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#212830] border border-[#3A4754] rounded p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E725A] mx-auto mb-4"></div>
        <p className="text-[#9CA3AF]">Loading checkpoints...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#212830] border border-[#3A4754] rounded p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#E1E3E4] flex items-center gap-2">
          <Filter className="w-6 h-6 text-[#C0A66B]" />
          Checkpoint Records
        </h2>
        <button
          onClick={loadCheckpoints}
          className="px-4 py-2 bg-[#5E725A] hover:bg-[#4A5E43] rounded text-[#E1E3E4] text-sm transition-colors font-semibold"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search checkpoints..."
            className="w-full bg-[#1E252F] border border-[#3A4754] rounded px-10 py-2 text-[#E1E3E4] placeholder-[#6B7280] focus:outline-none focus:border-[#5E725A] transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'crate' | 'track')}
          className="bg-[#1E252F] border border-[#3A4754] rounded px-4 py-2 text-[#E1E3E4] focus:outline-none focus:border-[#5E725A] transition-colors"
        >
          <option value="date">Sort by Date</option>
          <option value="crate">Sort by Crate</option>
          <option value="track">Sort by Track</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'verified' | 'flagged')}
          className="bg-[#1E252F] border border-[#3A4754] rounded px-4 py-2 text-[#E1E3E4] focus:outline-none focus:border-[#5E725A] transition-colors"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified Only</option>
          <option value="flagged">Flagged Only</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-[#9CA3AF]">
        Showing {filteredCheckpoints.length} of {checkpoints.length} checkpoints
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#3A4754]">
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Track ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Crate ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Operator
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#C0A66B] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCheckpoints.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#9CA3AF]">
                  No checkpoints found
                </td>
              </tr>
            ) : (
              filteredCheckpoints.map((checkpoint) => (
                <tr
                  key={checkpoint.id}
                  className="border-b border-[#3A4754] hover:bg-[#1E252F] transition-colors"
                >
                  <td className="py-3 px-4 text-[#E1E3E4] text-sm">
                    {formatDate(checkpoint.timestamp)}
                  </td>
                  <td className="py-3 px-4 text-[#9CA3AF] font-mono text-sm">
                    {checkpoint.trackId}
                  </td>
                  <td className="py-3 px-4 text-[#9CA3AF] font-mono text-sm">
                    {checkpoint.crateId}
                  </td>
                  <td className="py-3 px-4 text-[#9CA3AF] text-sm">
                    {checkpoint.geolocation.latitude.toFixed(4)}, {checkpoint.geolocation.longitude.toFixed(4)}
                  </td>
                  <td className="py-3 px-4 text-[#E1E3E4] text-sm">
                    {checkpoint.operator}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(checkpoint)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
