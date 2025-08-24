const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor'); // Adjust path if needed

dotenv.config();

const allDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20medical%20office%20background%2C%20natural%20lighting%2C%20modern%20healthcare%20setting&width=200&height=200&seq=doctor1&orientation=squarish', status: 'Available',
    rating: 4.9,
    experience: '15+ years',
    education: 'MD from Harvard Medical School',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and non-invasive cardiac procedures.',
    location: 'New York Medical Center',
    languages: ['English', 'Spanish'],
    consultationFee: '$150',
    availability: {
      Monday: ['9:00 AM', '10:30 AM', '2:00 PM'],
      Tuesday: ['9:00 AM', '11:00 AM'],
      Wednesday: ['10:00 AM', '2:30 PM'],
      Thursday: ['9:00 AM', '11:30 AM'],
      Friday: ['9:00 AM', '1:30 PM'],
      Saturday: ['10:00 AM'],
      Sunday: []
    }
  },
  {
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20male%20doctor%20in%20white%20coat%2C%20confident%20expression%2C%20clean%20medical%20facility%20background%2C%20bright%20lighting%2C%20healthcare%20professional&width=200&height=200&seq=doctor2&orientation=squarish', status: 'Available',
    rating: 4.8,
    experience: '12+ years',
    education: 'MD from Johns Hopkins University',
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in skin cancer detection, cosmetic dermatology, and dermatopathology.',
    location: 'Downtown Dermatology Clinic',
    languages: ['English', 'Mandarin'],
    consultationFee: '$120',
    availability: {
      Monday: ['8:00 AM', '9:30 AM', '11:00 AM'],
      Tuesday: ['9:00 AM', '10:30 AM'],
      Wednesday: ['8:30 AM', '12:00 PM'],
      Thursday: ['9:00 AM', '11:00 AM'],
      Friday: ['8:00 AM', '10:00 AM'],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    image: 'https://readdy.ai/api/search-image?query=Friendly%20female%20pediatric%20doctor%20in%20white%20coat%2C%20kind%20smile%2C%20colorful%20children%20hospital%20background%2C%20welcoming%20atmosphere%2C%20child-friendly%20medical%20environment&width=200&height=200&seq=doctor3&orientation=squarish', status: 'On Leave',
    rating: 4.7,
    experience: '8+ years',
    education: 'MD from UCLA School of Medicine',
    about: 'Dr. Emily Rodriguez has dedicated her career to caring for children. She is passionate about child wellness, vaccination, and early childhood development.',
    location: 'Sunshine Children’s Hospital',
    languages: ['English', 'Spanish'],
    consultationFee: '$100',
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    image: 'https://readdy.ai/api/search-image?query=Experienced%20male%20orthopedic%20surgeon%20in%20medical%20scrubs%2C%20professional%20appearance%2C%20modern%20operating%20room%20background%2C%20surgical%20equipment%20visible&width=200&height=200&seq=doctor4&orientation=squarish', status: 'Available',
    rating: 4.9,
    experience: '20+ years',
    education: 'MD from Stanford University',
    about: 'Dr. James Wilson is a highly experienced orthopedic surgeon specializing in sports injuries, joint replacements, and minimally invasive procedures.',
    location: 'OrthoCare Hospital',
    languages: ['English'],
    consultationFee: '$180',
    availability: {
      Monday: ['10:00 AM', '2:00 PM'],
      Tuesday: ['9:30 AM', '3:00 PM'],
      Wednesday: ['8:00 AM'],
      Thursday: ['11:00 AM'],
      Friday: ['9:00 AM', '1:00 PM'],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. Lisa Park',
    specialization: 'Neurologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20neurologist%20in%20white%20lab%20coat%2C%20intelligent%20expression%2C%20brain%20scan%20images%20on%20screen%20background%2C%20medical%20technology%20environment&width=200&height=200&seq=doctor5&orientation=squarish', status: 'Available',
    rating: 4.8,
    experience: '14+ years',
    education: 'MD from Mayo Clinic School of Medicine',
    about: 'Dr. Lisa Park specializes in treating disorders of the brain and nervous system, including epilepsy, migraines, and Alzheimer’s disease.',
    location: 'NeuroLife Institute',
    languages: ['English', 'Korean'],
    consultationFee: '$160',
    availability: {
      Monday: ['9:00 AM', '11:00 AM'],
      Tuesday: ['10:00 AM', '3:00 PM'],
      Wednesday: ['9:00 AM'],
      Thursday: ['2:00 PM', '4:00 PM'],
      Friday: ['11:00 AM', '1:00 PM'],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. Robert Davis',
    specialization: 'General Practitioner',
    image: 'https://readdy.ai/api/search-image?query=Friendly%20male%20general%20practitioner%20in%20white%20coat%2C%20approachable%20smile%2C%20family%20clinic%20background%2C%20comfortable%20patient%20care%20environment&width=200&height=200&seq=doctor6&orientation=squarish', status: 'Available',
    rating: 4.6,
    experience: '18+ years',
    education: 'MBBS from University of Michigan',
    about: 'Dr. Robert Davis provides comprehensive healthcare to patients of all ages. His areas of interest include preventive care, lifestyle diseases, and wellness programs.',
    location: 'Community Health Center',
    languages: ['English'],
    consultationFee: '$100',
    availability: {
      Monday: ['9:00 AM', '10:00 AM'],
      Tuesday: ['9:30 AM', '11:00 AM'],
      Wednesday: ['10:00 AM', '2:00 PM'],
      Thursday: ['8:00 AM', '10:00 AM'],
      Friday: ['9:00 AM'],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. Maria Garcia',
    specialization: 'Gynecologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20gynecologist%20in%20white%20medical%20coat%2C%20caring%20expression%2C%20womens%20health%20clinic%20background%2C%20medical%20consultation%20room%20setting&width=200&height=200&seq=doctor7&orientation=squarish', status: 'On Leave',
    rating: 4.7,
    experience: '11+ years',
    education: 'MD from University of Chicago',
    about: 'Dr. Maria Garcia is an expert in women’s health. She is known for her compassionate care in areas such as reproductive health, prenatal care, and menopause management.',
    location: 'Women’s Wellness Center',
    languages: ['English', 'Spanish'],
    consultationFee: '$130',
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: 'Dr. David Kim',
    specialization: 'Ophthalmologist',
    image: 'https://readdy.ai/api/search-image?query=Male%20ophthalmologist%20in%20white%20coat%20with%20eye%20examination%20equipment%2C%20professional%20medical%20setting%2C%20eye%20care%20clinic%20background%2C%20precision%20instruments&width=200&height=200&seq=doctor8&orientation=squarish', status: 'Available',
    rating: 4.8,
    experience: '16+ years',
    education: 'MD from Duke University School of Medicine',
    about: 'Dr. David Kim specializes in medical and surgical eye care. He has helped thousands of patients with vision correction, glaucoma treatment, and cataract surgery.',
    location: 'VisionCare Eye Hospital',
    languages: ['English', 'Korean'],
    consultationFee: '$140',
    availability: {
      Monday: ['10:00 AM', '11:30 AM'],
      Tuesday: ['9:00 AM', '2:00 PM'],
      Wednesday: ['10:30 AM', '3:30 PM'],
      Thursday: ['8:00 AM'],
      Friday: ['11:00 AM', '1:00 PM'],
      Saturday: [],
      Sunday: []
    }

  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Doctor.deleteMany(); // Optional: Clean slate
    await Doctor.insertMany(allDoctors);
    console.log('✅ Doctors seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Failed to seed doctors:', err);
    mongoose.connection.close();
  }
};

seedDoctors();
