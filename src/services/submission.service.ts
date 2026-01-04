import SubmittedRequirement from '@/models/submitted-requirement.model';

export async function submitRequirement(data: any) {
  const s = new SubmittedRequirement(data);
  return s.save();
}

export async function listSubmissions(limit = 200) {
  return SubmittedRequirement.find().sort({ submission_date: -1 }).populate('student').limit(limit);
}
