import express from 'express';
import mongoose from 'mongoose';
import Mobil from '../models/Mobil.js';

const router = express.Router();

// 1. POST /api/mobil - Menambahkan data baru
router.post('/', async (req, res) => {
  try {
    const mobilBaru = new Mobil(req.body);
    const tersimpan = await mobilBaru.save();
    res.status(201).json({
      message: 'Data penyewaan mobil berhasil ditambahkan',
      data: tersimpan
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal menambahkan data, input tidak valid',
      error: error.message
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const daftarMobil = await Mobil.find();
    res.status(200).json({
      message: 'Berhasil mengambil seluruh data penyewaan mobil',
      data: daftarMobil
    });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Format ID MongoDB tidak valid' });
    }

    const mobil = await Mobil.findById(id);
    if (!mobil) {
      return res.status(404).json({ message: 'Data mobil tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Detail data mobil ditemukan',
      data: mobil
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Format ID MongoDB tidak valid' });
    }

    const mobilUpdate = await Mobil.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!mobilUpdate) {
      return res.status(404).json({ message: 'Data mobil tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Data mobil berhasil diperbarui',
      data: mobilUpdate
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal memperbarui data, input tidak valid',
      error: error.message
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Format ID MongoDB tidak valid' });
    }

    const mobilHapus = await Mobil.findByIdAndDelete(id);
    if (!mobilHapus) {
      return res.status(404).json({ message: 'Data mobil tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Data mobil berhasil dihapus',
      data: mobilHapus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;