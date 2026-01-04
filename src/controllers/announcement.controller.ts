import { Request, Response } from 'express';
import * as AnnouncementService from '@/services/announcement.service';

// Extend Express Request type to include file from multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function createAnnouncement(req: MulterRequest, res: Response) {
  try {
    const data = req.body;
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    const created = await AnnouncementService.createAnnouncement(data);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function listAnnouncements(req: Request, res: Response) {
  const items = await AnnouncementService.listAnnouncements();
  res.json(items);
}

export async function deleteAnnouncement(req: Request, res: Response) {
  const { id } = req.params;
  await AnnouncementService.deleteAnnouncement(id);
  res.json({ ok: true });
}
