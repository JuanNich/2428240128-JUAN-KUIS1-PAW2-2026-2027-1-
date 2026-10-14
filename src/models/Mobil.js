import mongoose from 'mongoose';

// Membuat Schema (aturan struktur data di MongoDB)
const mobilSchema = new mongoose.Schema({
  merk_mobil: {
    type: String,
    required: [true, 'Merk mobil wajib diisi'] // Validasi tidak boleh kosong
  },
  harga_per_hari: {
    type: Number,
    required: [true, 'Harga per hari wajib diisi']
  },
  tersedia: {
    type: Boolean,
    default: true // Nilai bawaan jika tidak diisi saat input
  }
}, {
  timestamps: true, // Otomatis membuat field createdAt & updatedAt
  collection: 'penyewaan_mobil' // Menentukan nama collection di MongoDB
});

// Membuat dan mengekspor Model
const Mobil = mongoose.model('Mobil', mobilSchema);
export default Mobil;