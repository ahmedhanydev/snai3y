"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Phone, Mail, Search } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  rating: number;
  lastOrder: string;
  status: 'active' | 'inactive';
}

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock data - replace with real data from your backend
  const clients: Client[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '01234567890',
      location: 'المعادي، القاهرة',
      totalOrders: 15,
      rating: 4.8,
      lastOrder: '2025-05-01',
      status: 'active'
    },
    {
      id: 2,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '01234567891',
      location: 'مدينة نصر، القاهرة',
      totalOrders: 8,
      rating: 4.5,
      lastOrder: '2025-04-28',
      status: 'active'
    },
    {
      id: 3,
      name: 'محمد علي',
      email: 'mohamed@example.com',
      phone: '01234567892',
      location: 'الدقي، الجيزة',
      totalOrders: 3,
      rating: 4.2,
      lastOrder: '2025-04-15',
      status: 'inactive'
    },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery);
    const matchesFilter = filter === 'all' || client.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">العملاء</h1>
          <p className="text-gray-600 mt-2">إدارة وعرض معلومات العملاء</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="البحث عن عميل..."
              className="pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              الكل
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
            >
              نشط
            </Button>
            <Button
              variant={filter === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilter('inactive')}
            >
              غير نشط
            </Button>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{client.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={client.status === 'active' ? 'default' : 'secondary'}
                >
                  {client.status === 'active' ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{client.location}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">عدد الطلبات:</span>
                  <span className="font-medium">{client.totalOrders}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">آخر طلب:</span>
                  <span className="font-medium">{client.lastOrder}</span>
                </div>
              </div>

              <Button className="w-full mt-4" variant="outline">
                عرض التفاصيل
              </Button>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا يوجد عملاء مطابقين لمعايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
