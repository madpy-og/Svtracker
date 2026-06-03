# Perencanaan Implementasi Zustand (State Management)

Dokumen ini merinci rencana migrasi state management pada frontend **Svtracker** dari pendekatan prop-drilling & local state hooks saat ini ke **Zustand**.

---

## 1. Analisis Masalah (Current Architecture Issues)

Saat ini, pengelolaan state pada frontend memiliki beberapa kerumitan:

1. **Prop Drilling & Local State:**
   - State `openModal` dan `openDrawer` dideklarasikan di [DashboardLayout.tsx](file:///d:/madda/FullStack/expense-tracker/frontend/src/components/layout/DashboardLayout.tsx) dan harus di-drill ke berbagai komponen seperti `Drawer`, `Navbar`, `Profile`, `AddButton`, dan `EditButton`.
   - Perubahan state modal memerlukan pemanggilan fungsi callback yang dilewatkan berkali-kali melalui props.

2. **Outlet Context React Router:**
   - Di [Income.tsx](file:///d:/madda/FullStack/expense-tracker/frontend/src/pages/dashboard/Income.tsx) dan [Expense.tsx](file:///d:/madda/FullStack/expense-tracker/frontend/src/pages/dashboard/Expense.tsx), data transaksi dan setter modal diambil menggunakan `useOutletContext<OutletContext>()`. Pendekatan ini rentan karena mengharuskan pendefinisian ulang tipe konteks di setiap file halaman dan membatasi fleksibilitas layout.

3. **Sinkronisasi Data yang Kurang Efisien:**
   - Setelah sukses menambahkan transaksi baru di `IncomeModal` atau `ExpenseModal`, fungsi `onSuccess` dipanggil untuk melakukan refetch data spesifik (misal `refetchIncomeData`).
   - Namun, data dashboard utama (seperti total saldo, total income, total expense, dan transaksi terbaru) di [useDashboard.ts](file:///d:/madda/FullStack/expense-tracker/frontend/src/hooks/useDashboard.ts) tidak otomatis ter-refresh karena dikelola secara terpisah tanpa mekanisme trigger global. Hal ini menyebabkan ketidaksinkronan data visual di halaman Home sebelum halaman di-reload.

---

## 2. Solusi yang Diusulkan (Proposed Solution)

Menggunakan **Zustand** untuk memisahkan logika UI state dan data finansial ke dalam global store. Kita akan membaginya menjadi 2 store utama:

1. **`useUIStore`**: Mengelola state interface seperti pembukaan modal, drawer samping, dan nama halaman aktif.
2. **`useFinanceStore`**: Mengelola seluruh data finansial (Income, Expense, Category, Source, Dashboard Summary, User Profile) beserta action untuk fetching dan mutasi (tambah/update).

---

## 3. Instalasi

Jalankan perintah berikut di folder `frontend`:
```bash
npm install zustand
```

---

## 4. Desain Store

### A. UI Store (`frontend/src/store/uiStore.ts`)

Store ini mengontrol state tampilan global tanpa prop drilling.

```typescript
import { create } from "zustand";

export type ModalType = "addIncome" | "addExpense" | "editProfile" | null;

interface UIState {
  openModal: ModalType;
  openDrawer: boolean;
  pageName: string;
  
  // Actions
  setOpenModal: (modal: ModalType) => void;
  closeModal: () => void;
  setOpenDrawer: (open: boolean) => void;
  toggleDrawer: () => void;
  setPageName: (name: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  openModal: null,
  openDrawer: false,
  pageName: "",

  setOpenModal: (modal) => set({ openModal: modal }),
  closeModal: () => set({ openModal: null }),
  setOpenDrawer: (open) => set({ openDrawer: open }),
  toggleDrawer: () => set((state) => ({ openDrawer: !state.openDrawer })),
  setPageName: (name) => set({ pageName: name }),
}));
```

---

### B. Finance Store (`frontend/src/store/financeStore.ts`)

Store ini menyatukan pemanggilan API dan pengelolaan data transaksi. Saat data transaksi berubah (misal setelah tambah income), store akan otomatis menembak ulang API dashboard agar data total balance dll. selalu sinkron secara realtime.

```typescript
import { create } from "zustand";
import { getUserById } from "../api/userApi";
import { getAllIncome, addIncome as apiAddIncome } from "../api/incomeApi";
import { getAllExpense, addExpense as apiAddExpense } from "../api/expenseApi";
import { getAllSource } from "../api/sourceApi";
import { getAllCategory } from "../api/categoryApi";
import { getDashboard } from "../api/dashboardApi";

import type { UserSchema } from "../schemas/userSchema";
import type { IncomeSchema, IncomeFormOutput } from "../schemas/incomeSchema";
import type { ExpenseSchema, ExpenseFormOutput } from "../schemas/expenseSchema";
import type { SourceSchema } from "../schemas/sourceSchema";
import type { CategorySchema } from "../schemas/categorySchema";
import type { DashboardSchema } from "../schemas/dashboardSchema";

interface FinanceState {
  profile: UserSchema | null;
  income: IncomeSchema[];
  expense: ExpenseSchema[];
  source: SourceSchema[];
  category: CategorySchema[];
  dashboard: DashboardSchema | null;
  
  isLoading: boolean;
  error: string | null;

  // Fetch Actions
  fetchProfile: () => Promise<void>;
  fetchIncome: () => Promise<void>;
  fetchExpense: () => Promise<void>;
  fetchSource: () => Promise<void>;
  fetchCategory: () => Promise<void>;
  fetchDashboard: () => Promise<void>;
  fetchAllData: () => Promise<void>; // Fetch awal untuk memuat seluruh data dashboard layout

  // Mutation Actions (Otomatis memicu refetch yang relevan)
  createIncome: (data: IncomeFormOutput) => Promise<void>;
  createExpense: (data: ExpenseFormOutput) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  profile: null,
  income: [],
  expense: [],
  source: [],
  category: [],
  dashboard: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      const data = await getUserById();
      set({ profile: data });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  },

  fetchIncome: async () => {
    try {
      const data = await getAllIncome();
      set({ income: data || [] });
    } catch (err) {
      console.error("Failed to fetch income", err);
    }
  },

  fetchExpense: async () => {
    try {
      const data = await getAllExpense();
      set({ expense: data || [] });
    } catch (err) {
      console.error("Failed to fetch expense", err);
    }
  },

  fetchSource: async () => {
    try {
      const data = await getAllSource();
      set({ source: data || [] });
    } catch (err) {
      console.error("Failed to fetch sources", err);
    }
  },

  fetchCategory: async () => {
    try {
      const data = await getAllCategory();
      set({ category: data || [] });
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  },

  fetchDashboard: async () => {
    try {
      const data = await getDashboard();
      set({ dashboard: data });
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  },

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        get().fetchProfile(),
        get().fetchIncome(),
        get().fetchExpense(),
        get().fetchSource(),
        get().fetchCategory(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      set({ error: "Gagal memuat beberapa data finansial" });
    } finally {
      set({ isLoading: false });
    }
  },

  createIncome: async (formData) => {
    set({ isLoading: true });
    try {
      await apiAddIncome(formData);
      // Sinkronisasi otomatis: panggil ulang data income & dashboard setelah mutasi sukses
      await Promise.all([
        get().fetchIncome(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      console.error("Failed to add income", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  createExpense: async (formData) => {
    set({ isLoading: true });
    try {
      await apiAddExpense(formData);
      // Sinkronisasi otomatis: panggil ulang data expense & dashboard setelah mutasi sukses
      await Promise.all([
        get().fetchExpense(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      console.error("Failed to add expense", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  }
}));
```

---

## 5. Rencana Langkah-Langkah Migrasi Kode

### Langkah 1: Hapus Prop Drilling di `DashboardLayout.tsx`
Refaktor file [DashboardLayout.tsx](file:///d:/madda/FullStack/expense-tracker/frontend/src/components/layout/DashboardLayout.tsx):
- Ganti local useState `openDrawer`, `openModal`, dan `pageName` dengan selector dari `useUIStore`.
- Ganti pemanggilan hooks manual (`useIncome`, `useExpense`, `useUser`, dsb.) dengan memanggil action `fetchAllData` di dalam `useEffect`.
- Bersihkan properti props pada saat memanggil komponen anak (`<Drawer>`, `<Navbar>`, `<Sidebar>`, `<Profile>`, `<Outlet />`).

### Langkah 2: Bersihkan Props Komponen UI / Modal
Komponen modal dapat langsung mengambil data dan action dari store:
- **`IncomeModal.tsx`**:
  - Baca `openModal` & action `closeModal` dari `useUIStore`.
  - Baca `source` dari `useFinanceStore`.
  - Ganti pemanggilan API `addIncome` dan callback `onSuccess` dengan action `createIncome` dari `useFinanceStore`.
- **`ExpenseModal.tsx`**:
  - Lakukan hal serupa seperti IncomeModal menggunakan store.
- **`ProfileModal.tsx`**:
  - Ganti dependency `onSuccess` dengan memanggil `fetchProfile()` setelah upload avatar sukses.

### Langkah 3: Bersihkan Komponen Pendukung
- **`Drawer.tsx`**, **`Navbar.tsx`**, **`Profile.tsx`**, **`AddButton`**, **`EditButton`**:
  - Hapus seluruh passing parameter `setOpenModal` dan `setOpenDrawer`.
  - Impor `useUIStore` dan panggil setter secara langsung pada event `onClick`.

### Langkah 4: Sederhanakan Halaman Dashboard
- **`Home.tsx`**:
  - Ambil `dashboard` dari `useFinanceStore`. (Tidak perlu memanggil hooks independen).
- **`Income.tsx`** & **`Expense.tsx`**:
  - Ambil data transaksi langsung dari `useFinanceStore` (`const income = useFinanceStore(state => state.income)`).
  - Tidak perlu menggunakan `useOutletContext()`, sehingga kode menjadi lebih bersih dan modular.

---

## 6. Keuntungan setelah Migrasi
1. **Lebih Sedikit Boilerplate & Clean Code:** Kode komponen UI berkurang drastis karena tidak perlu lagi mendefinisikan & meneruskan props modal/drawer.
2. **Sinkronisasi Data Sempurna:** Data dashboard utama selalu up-to-date saat ada penambahan/perubahan transaksi tanpa perlu me-reload web.
3. **Type Safety Lebih Baik:** Menghilangkan keharusan melakukan casting/definisikan tipe context React Router yang berulang di level halaman.
