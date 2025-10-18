import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E252F] relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 relative tracking-tight">
            <span className="text-white">Military</span>{' '}
            <span className="text-[#5E725A]">Logistics</span>{' '}
            <span className="text-[#C0A66B]">Platform</span>
          </h1>
          <p className="text-xl text-[#E1E3E4] mb-10 max-w-2xl mx-auto">
            Blockchain-based checkpoint tracking and audit system for tactical operations
          </p>
          
          <Link
            href="/logistics"
            className="group inline-flex items-center gap-3 bg-[#5E725A] hover:bg-[#4A5E43] text-[#E1E3E4] font-semibold px-10 py-4 rounded transition-all duration-300 text-lg hover:scale-105"
          >
            <Package className="w-6 h-6" />
            Launch Logistics System
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#212830] border border-[#3A4754] rounded p-8">
            <div className="w-12 h-12 bg-[#C0A66B]/20 rounded flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-[#C0A66B]" />
            </div>
            <h3 className="text-xl font-bold text-[#E1E3E4] mb-3">
              Checkpoint Tracking
            </h3>
            <p className="text-[#E1E3E4]">
              Record and track military delivery checkpoints with geolocation and blockchain verification
            </p>
          </div>
          
          <div className="bg-[#212830] border border-[#3A4754] rounded p-8">
            <div className="w-12 h-12 bg-[#C0A66B]/20 rounded flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-[#C0A66B]" />
            </div>
            <h3 className="text-xl font-bold text-[#E1E3E4] mb-3">
              Visual Dashboard
            </h3>
            <p className="text-[#E1E3E4]">
              Top-down visualization of trucks and crates with real-time status updates
            </p>
          </div>
          
          <div className="bg-[#212830] border border-[#3A4754] rounded p-8">
            <div className="w-12 h-12 bg-[#C0A66B]/20 rounded flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-[#C0A66B]" />
            </div>
            <h3 className="text-xl font-bold text-[#E1E3E4] mb-3">
              Audit System
            </h3>
            <p className="text-[#E1E3E4]">
              Blockchain-based verification and audit trails for complete transparency
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
