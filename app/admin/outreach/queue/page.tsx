'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Filter,
  ExternalLink,
  MessageSquare,
  Clock,
  Mail,
  Eye,
  MousePointer,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface QueueItem {
  id: string;
  campaign_id: string;
  operator_id: string;
  operator_name: string;
  operator_email: string;
  profile_url: string;
  status: string;
  initial_sent_at: string | null;
  initial_opened_at: string | null;
  initial_clicked_at: string | null;
  followup_sent_at: string | null;
  followup_opened_at: string | null;
  followup_clicked_at: string | null;
  converted_at: string | null;
  replied_at: string | null;
  notes: string | null;
}

interface Campaign {
  id: string;
  name: string;
}

function QueueContent() {
  const searchParams = useSearchParams();
  const campaignFilter = searchParams.get('campaign');

  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string>(campaignFilter || 'all');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    fetchQueueItems();
  }, [selectedCampaign, statusFilter]);

  async function fetchCampaigns() {
    if (!supabase) return;

    const { data } = await supabase
      .from('outreach_campaigns')
      .select('id, name')
      .order('created_at', { ascending: false });

    setCampaigns(data || []);
  }

  async function fetchQueueItems() {
    if (!supabase) return;

    let query = supabase
      .from('outreach_queue')
      .select('*')
      .order('initial_sent_at', { ascending: false, nullsFirst: false });

    if (selectedCampaign !== 'all') {
      query = query.eq('campaign_id', selectedCampaign);
    }

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data } = await query.limit(100);

    setQueueItems(data || []);
    setLoading(false);
  }

  async function markAsReplied(queueId: string) {
    if (!supabase) return;

    await supabase
      .from('outreach_queue')
      .update({
        replied_at: new Date().toISOString(),
      })
      .eq('id', queueId);

    fetchQueueItems();
  }

  const filteredItems = queueItems.filter(item =>
    item.operator_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.operator_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'opened': return 'bg-yellow-100 text-yellow-700';
      case 'clicked': return 'bg-purple-100 text-purple-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'bounced': return 'bg-red-100 text-red-700';
      case 'unsubscribed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'sent': return <Mail className="w-3 h-3" />;
      case 'opened': return <Eye className="w-3 h-3" />;
      case 'clicked': return <MousePointer className="w-3 h-3" />;
      case 'converted': return <CheckCircle className="w-3 h-3" />;
      case 'bounced': return <XCircle className="w-3 h-3" />;
      case 'unsubscribed': return <AlertCircle className="w-3 h-3" />;
      default: return <Mail className="w-3 h-3" />;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/outreach" className="p-2 hover:bg-neutral-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Outreach Queue</h1>
            <p className="text-neutral-600 mt-1">View and manage all outreach emails</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by operator name or email..."
                className="input pl-10"
              />
            </div>

            {/* Campaign Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-400" />
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="input w-48"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-40"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="converted">Converted</option>
              <option value="bounced">Bounced</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>

        {/* Queue Table */}
        <div className="card overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              No queue items found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Operator</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Initial Sent</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Opened</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Clicked</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Follow-up</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Converted</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-neutral-900 text-sm">
                          {item.operator_name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {item.operator_email}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {formatDate(item.initial_sent_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {formatDate(item.initial_opened_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {formatDate(item.initial_clicked_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {formatDate(item.followup_sent_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {formatDate(item.converted_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <a
                            href={item.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                            title="View Profile"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {!item.replied_at && item.status !== 'pending' && (
                            <button
                              onClick={() => markAsReplied(item.id)}
                              className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                              title="Mark as Replied"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-neutral-500">
          Showing {filteredItems.length} of {queueItems.length} items
        </div>
      </div>
    </div>
  );
}

export default function QueuePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    }>
      <QueueContent />
    </Suspense>
  );
}
