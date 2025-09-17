import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToastProvider } from '@/components/ui/toast-provider';
import { 
  Users, School, Store, Package, Settings,
  Plus, Edit, Trash2, Eye, BarChart3, Bell,
  User, ChevronDown, Shield, Database,
  TrendingUp, Award, MessageCircle, Calendar,
  MapPin, Activity, CreditCard, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToastProvider();
  const [activeTab, setActiveTab] = useState('users');
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showSellerDetail, setShowSellerDetail] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showEditSchool, setShowEditSchool] = useState(false);
  const [showDeleteSchoolConfirm, setShowDeleteSchoolConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [newSchool, setNewSchool] = useState({
    name: '',
    address: '',
    contact: ''
  });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Sekolah Baru Terdaftar', message: 'SMK 2 Bandung telah mendaftar ke platform', time: '30 menit lalu', read: false },
    { id: 2, title: 'Laporan Penjualan', message: 'Laporan penjualan mingguan siap untuk ditinjau', time: '2 jam lalu', read: false },
    { id: 3, title: 'User Baru', message: '5 siswa baru bergabung hari ini', time: '4 jam lalu', read: true }
  ]);

  const [users] = useState([
    { id: 1, name: 'Ahmad Siswa', email: 'ahmad@smk13.edu', role: 'Siswa', school: 'SMK 13 BANDUNG', class: 'XII RPL 1', phone: '081234567890' },
    { id: 2, name: 'Bu Sari', email: 'sari@kantin.smk13.edu', role: 'Penjual', school: 'SMK 13 BANDUNG', phone: '082345678901' },
    { id: 3, name: 'Siti Murid', email: 'siti@sma5.edu', role: 'Siswa', school: 'SMA 5 Jakarta', class: 'XI IPA 2', phone: '083456789012' }
  ]);

  const [schools, setSchools] = useState([
    { id: 1, name: 'SMK 13 BANDUNG', address: 'Jl. Raya Bandung No. 123', students: 1250, canteens: 5, contact: '022-1234567' },
    { id: 2, name: 'SMA 5 Jakarta', address: 'Jl. Sudirman No. 45', students: 980, canteens: 3, contact: '021-2345678' },
    { id: 3, name: 'SMP 2 Bandung', address: 'Jl. Asia Afrika No. 67', students: 750, canteens: 4, contact: '022-3456789' }
  ]);

  const [sellers] = useState([
    { id: 1, name: 'Bu Sari', canteen: 'Kantin Bu Sari', school: 'SMK 13 BANDUNG', status: 'Aktif', phone: '082345678901', totalSales: 450000 },
    { id: 2, name: 'Pak Budi', canteen: 'Kantin Pak Budi', school: 'SMK 13 BANDUNG', status: 'Aktif', phone: '084567890123', totalSales: 320000 },
    { id: 3, name: 'Bu Rita', canteen: 'Kantin Bu Rita', school: 'SMA 5 Jakarta', status: 'Nonaktif', phone: '085678901234', totalSales: 150000 }
  ]);

  const [orders] = useState([
    { id: 'ORD001', customer: 'Ahmad Siswa', seller: 'Bu Sari', total: 33000, status: 'Selesai', date: '15/01/2024', items: '2x Nasi Gudeg, 1x Es Teh' },
    { id: 'ORD002', customer: 'Siti Murid', seller: 'Pak Budi', total: 12000, status: 'Diproses', date: '15/01/2024', items: '1x Ayam Geprek' },
    { id: 'ORD003', customer: 'Budi Pelajar', seller: 'Bu Rita', total: 15000, status: 'Dibatalkan', date: '14/01/2024', items: '3x Keripik Singkong' }
  ]);

  const handleAddSchool = () => {
    if (!newSchool.name || !newSchool.address) {
      showToast({
        type: 'error',
        title: 'Error',
        description: 'Harap isi nama dan alamat sekolah'
      });
      return;
    }

    showToast({
      type: 'success',
      title: 'Sekolah Ditambahkan',
      description: `${newSchool.name} berhasil ditambahkan`
    });
    
    setShowAddSchoolModal(false);
    setNewSchool({ name: '', address: '', contact: '' });
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleViewSeller = (seller: any) => {
    setSelectedSeller(seller);
    setShowSellerDetail(true);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleEditSchool = (school: any) => {
    setSelectedSchool(school);
    setNewSchool({
      name: school.name,
      address: school.address,
      contact: school.contact || ''
    });
    setShowEditSchool(true);
  };

  const handleDeleteSchool = (school: any) => {
    setSelectedSchool(school);
    setShowDeleteSchoolConfirm(true);
  };

  const confirmDeleteSchool = () => {
    if (selectedSchool) {
      setSchools(schools.filter(s => s.id !== selectedSchool.id));
      showToast({
        type: 'success',
        title: 'Sekolah Dihapus',
        description: `${selectedSchool.name} berhasil dihapus`
      });
    }
    setShowDeleteSchoolConfirm(false);
    setSelectedSchool(null);
  };

  const handleUpdateSchool = () => {
    if (!newSchool.name || !newSchool.address) {
      showToast({
        type: 'error',
        title: 'Error',
        description: 'Harap isi nama dan alamat sekolah'
      });
      return;
    }

    setSchools(schools.map(s => 
      s.id === selectedSchool.id 
        ? {...s, name: newSchool.name, address: newSchool.address, contact: newSchool.contact}
        : s
    ));
    
    showToast({
      type: 'success',
      title: 'Sekolah Diperbarui',
      description: `${newSchool.name} berhasil diperbarui`
    });
    
    setShowEditSchool(false);
    setSelectedSchool(null);
    setNewSchool({ name: '', address: '', contact: '' });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Siswa':
        return <Badge className="bg-blue-100 text-blue-700">Siswa</Badge>;
      case 'Penjual':
        return <Badge className="bg-orange-100 text-orange-700">Penjual</Badge>;
      case 'Admin':
        return <Badge className="bg-red-100 text-red-700">Admin</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <Badge className="bg-green-100 text-green-700">Aktif</Badge>;
      case 'Nonaktif':
        return <Badge variant="outline">Nonaktif</Badge>;
      case 'Selesai':
        return <Badge className="bg-green-100 text-green-700">Selesai</Badge>;
      case 'Diproses':
        return <Badge className="bg-blue-100 text-blue-700">Diproses</Badge>;
      case 'Dibatalkan':
        return <Badge variant="outline">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Users Tab
  if (activeTab === 'users') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Data User</h1>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowNotifications(true)}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Users List */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {users.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.school}</p>
                  <div className="mt-2">
                    {getRoleBadge(user.role)}
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={() => handleViewUser(user)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
          <div className="flex items-center justify-around py-2 text-xs">
            {[
              { id: 'users', icon: Users, label: 'User' },
              { id: 'schools', icon: School, label: 'Sekolah' },
              { id: 'sellers', icon: Store, label: 'Penjual' },
              { id: 'orders', icon: Package, label: 'Pesanan' },
              { id: 'settings', icon: Settings, label: 'Setting' }
            ].map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Schools Tab
  if (activeTab === 'schools') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Data Sekolah</h1>
              <Button onClick={() => setShowAddSchoolModal(true)} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Tambah
              </Button>
            </div>
          </div>
        </header>

        {/* Schools List */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
          {schools.map((school) => (
            <Card key={school.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{school.name}</h3>
                  <p className="text-sm text-muted-foreground">{school.address}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-muted-foreground">
                      {school.students} Siswa
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {school.canteens} Kantin
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditSchool(school)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteSchool(school)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add School Modal */}
        <Modal
          isOpen={showAddSchoolModal}
          onClose={() => setShowAddSchoolModal(false)}
          title="Tambah Sekolah Baru"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="schoolName">Nama Sekolah</Label>
              <Input
                id="schoolName"
                placeholder="Masukkan nama sekolah"
                value={newSchool.name}
                onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="schoolAddress">Alamat</Label>
              <Input
                id="schoolAddress"
                placeholder="Masukkan alamat sekolah"
                value={newSchool.address}
                onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="schoolContact">Kontak</Label>
              <Input
                id="schoolContact"
                placeholder="Nomor telepon / email (opsional)"
                value={newSchool.contact}
                onChange={(e) => setNewSchool({...newSchool, contact: e.target.value})}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddSchoolModal(false)}
              >
                Batal
              </Button>
              <Button className="flex-1 btn-ripple" onClick={handleAddSchool}>
                Tambah Sekolah
              </Button>
            </div>
          </div>
        </Modal>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
          <div className="flex items-center justify-around py-2 text-xs">
            {[
              { id: 'users', icon: Users, label: 'User' },
              { id: 'schools', icon: School, label: 'Sekolah' },
              { id: 'sellers', icon: Store, label: 'Penjual' },
              { id: 'orders', icon: Package, label: 'Pesanan' },
              { id: 'settings', icon: Settings, label: 'Setting' }
            ].map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sellers Tab
  if (activeTab === 'sellers') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b">
          <div className="px-4 py-4">
            <h1 className="text-xl font-bold">Data Penjual</h1>
          </div>
        </header>

        {/* Sellers List */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {sellers.map((seller) => (
            <Card key={seller.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{seller.name}</h3>
                  <p className="text-sm text-muted-foreground">{seller.canteen}</p>
                  <p className="text-sm text-muted-foreground">{seller.school}</p>
                  <div className="mt-2">
                    {getStatusBadge(seller.status)}
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={() => handleViewSeller(seller)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
          <div className="flex items-center justify-around py-2 text-xs">
            {[
              { id: 'users', icon: Users, label: 'User' },
              { id: 'schools', icon: School, label: 'Sekolah' },
              { id: 'sellers', icon: Store, label: 'Penjual' },
              { id: 'orders', icon: Package, label: 'Pesanan' },
              { id: 'settings', icon: Settings, label: 'Setting' }
            ].map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Orders Tab
  if (activeTab === 'orders') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b">
          <div className="px-4 py-4">
            <h1 className="text-xl font-bold">Data Pesanan</h1>
          </div>
        </header>

        {/* Orders List */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer} → {order.seller}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-primary">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={() => handleViewOrder(order)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
          <div className="flex items-center justify-around py-2 text-xs">
            {[
              { id: 'users', icon: Users, label: 'User' },
              { id: 'schools', icon: School, label: 'Sekolah' },
              { id: 'sellers', icon: Store, label: 'Penjual' },
              { id: 'orders', icon: Package, label: 'Pesanan' },
              { id: 'settings', icon: Settings, label: 'Setting' }
            ].map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications Modal */}
        <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifikasi Admin">
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-3 rounded-lg border ${!notif.read ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{notif.title}</h4>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
                {!notif.read && (
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setNotifications(notifications.map(n => 
                          n.id === notif.id ? {...n, read: true} : n
                        ));
                      }}
                    >
                      Tandai Dibaca
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setNotifications(notifications.map(n => ({...n, read: true})));
                showToast({ type: 'success', title: 'Semua notifikasi ditandai sebagai dibaca', description: '' });
              }}
            >
              Tandai Semua Dibaca
            </Button>
          </div>
        </Modal>

        {/* User Detail Modal */}
        <Modal isOpen={showUserDetail} onClose={() => setShowUserDetail(false)} title="Detail User">
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                  {getRoleBadge(selectedUser.role)}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sekolah</p>
                  <p className="font-medium">{selectedUser.school}</p>
                </div>
                {selectedUser.class && (
                  <div>
                    <p className="text-sm text-muted-foreground">Kelas</p>
                    <p className="font-medium">{selectedUser.class}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setShowUserDetail(false)}>
                Tutup
              </Button>
            </div>
          )}
        </Modal>

        {/* Seller Detail Modal */}
        <Modal isOpen={showSellerDetail} onClose={() => setShowSellerDetail(false)} title="Detail Penjual">
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedSeller.name}</h3>
                  {getStatusBadge(selectedSeller.status)}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Kantin</p>
                  <p className="font-medium">{selectedSeller.canteen}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sekolah</p>
                  <p className="font-medium">{selectedSeller.school}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-medium">{selectedSeller.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Penjualan</p>
                  <p className="font-medium text-primary">Rp {selectedSeller.totalSales?.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setShowSellerDetail(false)}>
                Tutup
              </Button>
            </div>
          )}
        </Modal>

        {/* Order Detail Modal */}
        <Modal isOpen={showOrderDetail} onClose={() => setShowOrderDetail(false)} title="Detail Pesanan">
          {selectedOrder && (
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-semibold">{selectedOrder.id}</h3>
                <p className="text-sm text-muted-foreground">Tanggal: {selectedOrder.date}</p>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Penjual</p>
                  <p className="font-medium">{selectedOrder.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-primary">Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setShowOrderDetail(false)}>
                Tutup
              </Button>
            </div>
          )}
        </Modal>

        {/* Edit School Modal */}
        <Modal
          isOpen={showEditSchool}
          onClose={() => setShowEditSchool(false)}
          title="Edit Sekolah"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="editSchoolName">Nama Sekolah</Label>
              <Input
                id="editSchoolName"
                placeholder="Masukkan nama sekolah"
                value={newSchool.name}
                onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="editSchoolAddress">Alamat</Label>
              <Input
                id="editSchoolAddress"
                placeholder="Masukkan alamat sekolah"
                value={newSchool.address}
                onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="editSchoolContact">Kontak</Label>
              <Input
                id="editSchoolContact"
                placeholder="Nomor telepon / email (opsional)"
                value={newSchool.contact}
                onChange={(e) => setNewSchool({...newSchool, contact: e.target.value})}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowEditSchool(false);
                  setSelectedSchool(null);
                  setNewSchool({ name: '', address: '', contact: '' });
                }}
              >
                Batal
              </Button>
              <Button className="flex-1 btn-ripple" onClick={handleUpdateSchool}>
                Update Sekolah
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete School Confirmation Modal */}
        <Modal
          isOpen={showDeleteSchoolConfirm}
          onClose={() => setShowDeleteSchoolConfirm(false)}
          title="Hapus Sekolah"
        >
          <div className="space-y-4">
            <p>Apakah Anda yakin ingin menghapus sekolah <strong>{selectedSchool?.name}</strong>?</p>
            <p className="text-sm text-muted-foreground">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDeleteSchoolConfirm(false);
                  setSelectedSchool(null);
                }}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmDeleteSchool}
              >
                Hapus
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // Settings Tab
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">Pengaturan Admin</h1>
        </div>
      </header>

      {/* Settings Content */}
      <div className="p-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Ubah Password Admin</h3>
          <div className="space-y-3">
            <Input type="password" placeholder="Password lama" />
            <Input type="password" placeholder="Password baru" />
            <Input type="password" placeholder="Konfirmasi password baru" />
          </div>
          <Button className="w-full mt-3">Ubah Password</Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Statistik Platform</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total User</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{schools.length}</p>
              <p className="text-sm text-muted-foreground">Total Sekolah</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{sellers.length}</p>
              <p className="text-sm text-muted-foreground">Total Penjual</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{orders.length}</p>
              <p className="text-sm text-muted-foreground">Total Pesanan</p>
            </div>
          </div>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => navigate('/login')}
        >
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="flex items-center justify-around py-2 text-xs">
          {[
            { id: 'users', icon: Users, label: 'User' },
            { id: 'schools', icon: School, label: 'Sekolah' },
            { id: 'sellers', icon: Store, label: 'Penjual' },
            { id: 'orders', icon: Package, label: 'Pesanan' },
            { id: 'settings', icon: Settings, label: 'Setting' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 ${
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;