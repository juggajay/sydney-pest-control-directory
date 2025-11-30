'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  Plus,
  RefreshCw,
  Play,
  Pause,
  Edit,
  Eye,
  ArrowLeft
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  initial_subject: string;
  created_at: string;
  queue_stats?: {
    total: number;
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      // Fetch queue stats for each campaign
      const campaignsWithStats = await Promise.all(
        data.map(async (campaign) => {
          const { data: queueItems } = await supabase
            .from('outreach_queue')
            .select('status')
            .eq('campaign_id', campaign.id);

          const stats = {
            total: queueItems?.length || 0,
            sent: queueItems?.filter(q => ['sent', 'opened', 'clicked', 'converted'].includes(q.status)).length || 0,
            opened: queueItems?.filter(q => ['opened', 'clicked', 'converted'].includes(q.status)).length || 0,
            clicked: queueItems?.filter(q => ['clicked', 'converted'].includes(q.status)).length || 0,
            converted: queueItems?.filter(q => q.status === 'converted').length || 0,
          };

          return { ...campaign, queue_stats: stats };
        })
      );

      setCampaigns(campaignsWithStats);
    }

    setLoading(false);
  }

  async function toggleCampaignStatus(campaignId: string, currentStatus: string) {
    if (!supabase) return;

    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    await supabase
      .from('outreach_campaigns')
      .update({ status: newStatus })
      .eq('id', campaignId);

    fetchCampaigns();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/outreach" className="p-2 hover:bg-neutral-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Campaigns</h1>
              <p className="text-neutral-600 mt-1">Manage your outreach campaigns</p>
            </div>
          </div>
          <Link href="/admin/outreach/campaigns/new" className="btn btn-primary mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Link>
        </div>

        {/* Campaigns List */}
        {campaigns.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-neutral-500 mb-4">No campaigns yet</p>
            <Link href="/admin/outreach/campaigns/new" className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-neutral-900">
                        {campaign.name}
                      </h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-3">
                      Subject: {campaign.initial_subject}
                    </p>
                    {campaign.queue_stats && (
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-neutral-600">
                          <strong className="text-neutral-900">{campaign.queue_stats.sent}</strong> / {campaign.queue_stats.total} sent
                        </span>
                        <span className="text-neutral-600">
                          <strong className="text-neutral-900">
                            {campaign.queue_stats.total > 0
                              ? ((campaign.queue_stats.opened / campaign.queue_stats.total) * 100).toFixed(0)
                              : 0}%
                          </strong> open rate
                        </span>
                        <span className="text-neutral-600">
                          <strong className="text-neutral-900">{campaign.queue_stats.converted}</strong> conversions
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                      className="btn btn-ghost btn-sm"
                      disabled={campaign.status === 'draft' || campaign.status === 'completed'}
                    >
                      {campaign.status === 'active' ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Resume
                        </>
                      )}
                    </button>
                    <Link
                      href={`/admin/outreach/queue?campaign=${campaign.id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Queue
                    </Link>
                    <Link
                      href={`/admin/outreach/campaigns/${campaign.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
