# 📄 Rencana & Analisis Implementasi Pagination In-Place (Tanpa Pindah Halaman)

Dokumen ini berisi arsitektur, analisis teknologi (**TanStack Query**, **Zustand**, **React State**), serta roadmap implementasi fitur pagination *in-place* (di dalam masing-masing card seperti **Recent Transactions**, **Income Source**, dan **Expense Category**) tanpa perlu me-reload halaman atau navigasi routing URL.

---

## 1. 🎯 Tujuan & Kebutuhan

1. **In-Place Navigation**: Pengguna dapat berpindah halaman data (contoh: 7 data per page) langsung di dalam card tanpa berpindah halaman web/rute (`/dashboard`).
2. **Smooth UX & Zero Flickering**: Transisi antar halaman data cepat, mulus, dan tidak merusak layout dashboard (tinggi card dinamis/stabil).
3. **Multi-Card Independent State**: Halaman Home/Income/Expense bisa memiliki pagination masing-masing tanpa saling bertabrakan.
4. **Skalabilitas Data**: Mendukung data kecil-menengah hingga data transaksi yang berjumlah ribuan.

---

## 2. 🔍 Analisis Pilihan Arsitektur & Teknologi

| Pendekatan | Mekanisme Data | Manajemen State | Kelebihan | Kekurangan |
| :--- | :--- | :--- | :--- | :--- |
| **Opsi 1: Client-Side Pagination** | Ambil seluruh/batch data di awal, lalu di-`slice` di frontend. | `useState` lokal atau **Zustand** | • Sangat cepat (0ms latency saat ganti page)<br>• Tanpa ubah endpoint backend<br>• Mudah diimplementasi | Kurang optimal jika data transaksi sudah mencapai ribuan record. |
| **Opsi 2: Server-Side Pagination (TanStack Query v5)** | Ambil data per page dari API (`?page=1&limit=7`) menggunakan `useQuery`. | TanStack Query Cache + `placeholderData: keepPreviousData` | • Sangat scalable untuk data besar<br>• Hemat memori browser & payload API<br>• Caching otomatis | Perlu modifikasi controller & model backend (Mongoose `.skip()` & `.limit()`). |
| **Opsi 3: Hybrid (Server-Side + TanStack Query Prefetching)** | Server-side API + prefetch halaman berikutnya (`page + 1`) di background. | TanStack Query (`queryClient.prefetchQuery`) | • Skalabilitas server-side<br>• Kecepatan instan layaknya client-side karena data page berikutnya sudah di-cache | Kompleksitas kode sedikit lebih tinggi. |

---

## 3. 🛠️ Evaluasi State Management: TanStack Query vs Zustand vs React State

### A. TanStack Query (Sangat Direkomendasikan untuk Server Data)
**Kelebihan untuk Pagination:**
- **`placeholderData: keepPreviousData` (v5)**: Saat berpindah dari Page 1 ke Page 2, data Page 1 tetap ditampilkan sampai data Page 2 selesai di-fetch (tidak ada layar putih/layout lompat).
- **Automatic Caching**: Jika user kembali ke Page 1, data langsung muncul instan dari cache tanpa loading ulang.
- **Prefetching**: Bisa men-trigger `queryClient.prefetchQuery` untuk halaman berikutnya saat tombol Next di-hover atau saat halaman pertama selesai dimuat.

```typescript
// Contoh implementasi hook dengan TanStack Query v5
export const useGetRecentTransactions = (page: number, limit: number = 7) => {
  return useQuery({
    queryKey: ['recentTransactions', page, limit],
    queryFn: () => getRecentTransactions({ page, limit }),
    placeholderData: keepPreviousData, // Menjaga UI tidak kedip saat fetching page baru
    staleTime: 1000 * 60 * 2, // 2 menit cache fresh
  });
};
```

### B. Zustand (Direkomendasikan untuk Global Setting / Filter Sync)
**Kapan Menggunakan Zustand?**
- Jika ingin menyimpan preferensi tampilan user (misal: user mengubah limit dari 7 ke 10 atau 15 dan ingin preferensi ini diingat).
- Jika ada filter global (misal: rentang tanggal atau kategori) yang harus me-reset semua pagination ke Page 1 secara serentak.

```typescript
// store/paginationStore.ts (Opsional jika ingin pagination state tersinkronisasi/tersimpan)
interface CardPaginationState {
  recentPage: number;
  incomePage: number;
  expensePage: number;
  setRecentPage: (page: number) => void;
  resetAllPages: () => void;
}
```

### C. Component Local State (`useState`) (Sederhana & Terisolasi)
**Kapan Menggunakan `useState`?**
- Paling pas jika pagination murni lokal untuk satu card tertentu tanpa perlu diketahui komponen lain di luar card tersebut.

---

## 4. 🎨 Desain UI & Komponen Reusable

### Komponen: `CardPagination.tsx`
Komponen kontrol pagination yang fleksibel dan serasi dengan tema Svtracker:

```tsx
// src/components/ui/CardPagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  isCompact?: boolean; // Tampilan ringkas untuk card kecil
}

export const CardPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  isCompact = false,
}: CardPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2 border-t border-cusgrey/60 text-capt-m md:text-capt text-cusdarkgrey">
      {!isCompact && totalItems && (
        <p className="font-medium">
          Total: <span className="text-cusblack font-semibold">{totalItems}</span> data
        </p>
      )}
      
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded-md hover:bg-cusgrey disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="font-semibold text-cusblack">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md hover:bg-cusgrey disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
```

---

## 5. 🚀 Rencana Langkah Implementasi (Roadmap)

### 📌 Tahap 1: Client-Side Pagination Cepat (Immediate Value)
*Bisa diterapkan langsung tanpa mengubah struktur backend saat ini.*
1. Buat komponen reusable `CardPagination.tsx`.
2. Di dalam komponen `ListRecentTransactions` atau halaman `Home.tsx`, tambahkan state `page = useState(1)`.
3. Lakukan kalkulasi:
   ```typescript
   const ITEMS_PER_PAGE = 7;
   const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
   const displayedTransactions = transactions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
   ```
4. Pasang `CardPagination` di bagian footer Card.

### 📌 Tahap 2: Pengembangan Endpoint Paginated di Backend (Skalabilitas Penuh)
1. **Model & Controller Backend**:
   - Tambahkan parameter `page` dan `limit` pada query controller:
     - `GET /api/dashboard/recent-transactions?page=1&limit=7`
     - `GET /api/incomes?page=1&limit=7`
     - `GET /api/expenses?page=1&limit=7`
   - Format response standar:
     ```json
     {
       "data": [...],
       "pagination": {
         "currentPage": 1,
         "totalPages": 5,
         "totalItems": 32,
         "limit": 7,
         "hasNextPage": true,
         "hasPrevPage": false
       }
     }
     ```
2. **Mongoose Query**:
   Gunakan `.skip((page - 1) * limit).limit(limit)` serta `countDocuments()` untuk menghitung total item.

### 📌 Tahap 3: Integrasi TanStack Query v5 di Frontend
1. Buat hook query yang menerima parameter `page` dan `limit`.
2. Pasang `placeholderData: keepPreviousData` agar transisi antar page tidak memunculkan skeleton berkedip.
3. Tambahkan prefetching di `useEffect` atau `onMouseEnter` tombol Next agar data page selanjutnya sudah siap di cache.

### 📌 Tahap 4: Edge Cases & UX Polishing
- **Delete Item Handling**: Jika user menghapus item terakhir pada page `n`, otomatis mundurkan ke page `n - 1`.
- **Empty State**: Tampilan jika belum ada data sama sekali.
- **Card Height**: Memastikan card tetap menggunakan `h-fit` agar panjangnya fleksibel sesuai jumlah transaksi di halaman aktif.

---

## 6. 💡 Rekomendasi Solusi Terbaik

1. **Untuk saat ini (Tahap Singkat)**: Gunakan **Client-Side Slicing + `useState` + `CardPagination`** jika data yang diambil dari dashboard masih dalam batas wajar (< 50 transaksi).
2. **Untuk jangka panjang (Tahap Produksi)**: Gunakan **Server-Side API + TanStack Query v5 (`keepPreviousData` + Prefetching)** untuk performa maksimal, konsumsi RAM ringan, dan kesiapan menangani ribuan data transaksi keuangan.
