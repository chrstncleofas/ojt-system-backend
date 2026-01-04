import Announcement from '@/models/announcement.model';

export async function createAnnouncement(data: any) {
  const ann = new Announcement(data);
  return ann.save();
}

export async function listAnnouncements() {
  return Announcement.find().sort({ startDate: -1 }).limit(100);
}

export async function getAnnouncement(id: string) {
  return Announcement.findById(id);
}

export async function deleteAnnouncement(id: string) {
  return Announcement.findByIdAndDelete(id);
}
