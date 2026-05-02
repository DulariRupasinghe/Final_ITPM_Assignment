import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  GraduationCap,
  Users,
  Heart,
  Coffee,
  Music,
  Trophy,
  Camera,
  BookOpen,
  Dumbbell,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Sparkles,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Share2,
  Heart as HeartIcon,
  MessageCircle,
  Eye
} from 'lucide-react';

// Import images from assets/studentlife folder
import music1 from '../assets/studentlife/pexels-ken123films-2261952.jpg';
import music2 from '../assets/studentlife/pexels-a-darmel-7715764.jpg';
import music3 from '../assets/studentlife/pexels-wendywei-1190297.jpg';
import music4 from '../assets/studentlife/pexels-wendywei-1540406.jpg';

import sport1 from '../assets/studentlife/pexels-case-originals-3602833.jpg';
import sport2 from '../assets/studentlife/pexels-pixabay-247848.jpg';

import dance1 from '../assets/studentlife/pexels-agustina-croce-302580711-13411721.jpg';
import dance2 from '../assets/studentlife/pexels-fabricio-lira-942672-2896162.jpg';
import dance3 from '../assets/studentlife/pexels-prime-cinematics-1005175-2057274.jpg';

import outdoor1 from '../assets/studentlife/pexels-emma-bauso-1183828-3585812.jpg';
import outdoor2 from '../assets/studentlife/pexels-isabella-mendes-107313-1304475.jpg';
import outdoor3 from '../assets/studentlife/pexels-ketut-subiyanto-4473871.jpg';
import outdoor4 from '../assets/studentlife/pexels-vladvictoria-2363674.jpg';

const StudentLife = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState({});

  // Student Life Categories
  const categories = [
    { id: 'all', name: 'All Activities', icon: Sparkles, color: 'green' },
    { id: 'music', name: 'Music Events', icon: Music, color: 'purple' },
    { id: 'sports', name: 'Sports', icon: Trophy, color: 'blue' },
    { id: 'dance', name: 'Dance', icon: Heart, color: 'pink' },
    { id: 'outdoor', name: 'Outdoor', icon: Dumbbell, color: 'orange' }
  ];

  const [galleryItems, setGalleryItems] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        if (response.data.success) {
          const fetchedEvents = response.data.events.map(ev => {
            // Pick fallback image based on event category
            let fallbackImage;
            switch(ev.category) {
              case 'music': fallbackImage = music1; break;
              case 'sports': fallbackImage = sport1; break;
              case 'dance': fallbackImage = dance1; break;
              case 'outdoor': fallbackImage = outdoor1; break;
              default: fallbackImage = music2;
            }
            
            return {
              id: ev._id,
              category: ev.category,
              image: ev.image || ev.imageUrl || fallbackImage,
              title: ev.name,
              description: ev.description,
              date: new Date(ev.date).toLocaleDateString(),
              time: ev.time,
              location: ev.location,
              likes: Math.floor(Math.random() * 300) + 50,
              views: Math.floor(Math.random() * 1000) + 200,
              featured: ev.featured || false
            };
          });
          
          setGalleryItems(fetchedEvents);
          // Just take the first four events as upcoming mock representation
          setUpcomingEvents(fetchedEvents.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    
    fetchEvents();
  }, []);

  // Filter gallery items based on category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Featured items
  const featuredItems = galleryItems.filter(item => item.featured);

  // Handle like
  const handleLike = (id) => {
    setLikedImages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle image click
  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Statistics
  const stats = [
    { icon: Users, value: "50+", label: "Student Clubs", color: "bg-blue-500" },
    { icon: Calendar, value: "200+", label: "Annual Events", color: "bg-green-500" },
    { icon: Trophy, value: "100+", label: "Awards Won", color: "bg-yellow-500" },
    { icon: Heart, value: "95%", label: "Satisfaction Rate", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-60 relative">
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-green-200 transition flex items-center gap-2 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Student Life at <span className="text-green-200">UniManage</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience a vibrant campus life with endless opportunities for growth, fun, and friendship
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? 'bg-green-600 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-green-600" size={24} />
            Featured Moments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.slice(0, 3).map(item => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" onClick={() => handleImageClick(item)}>
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1"><Eye size={12} /> {item.views}</span>
                      <span className="flex items-center gap-1"><HeartIcon size={12} /> {item.likes}</span>
                    </div>
                  </div>
                </div>
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {activeCategory === 'all' ? 'All Activities' : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-56 cursor-pointer" onClick={() => handleImageClick(item)}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <Eye className="text-white" size={32} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1 text-sm transition ${likedImages[item.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                      >
                        <HeartIcon size={16} fill={likedImages[item.id] ? "currentColor" : "none"} />
                        <span>{likedImages[item.id] ? item.likes + 1 : item.likes}</span>
                      </button>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <Eye size={14} /> {item.views}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleImageClick(item)}
                      className="text-green-600 text-sm font-semibold hover:text-green-700 flex items-center gap-1"
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="text-green-600" size={24} />
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-32 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{event.title}</h3>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><Calendar size={10} /> {event.date}</div>
                    <div className="flex items-center gap-1"><Clock size={10} /> {event.time}</div>
                    <div className="flex items-center gap-1"><MapPin size={10} /> {event.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Testimonials */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Computer Science, Year 3</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"The campus life here is amazing! So many events and activities to participate in. I've made lifelong friends through the music club."</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Michael Chen</p>
                  <p className="text-xs text-gray-500">Business, Year 2</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"The sports facilities are world-class. Being part of the basketball team has been the highlight of my university experience."</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Emily Rodriguez</p>
                  <p className="text-xs text-gray-500">Arts, Year 1</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"The dance club and outdoor activities have made my first year unforgettable. So many opportunities to explore my interests!"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-auto max-h-[70vh] object-contain bg-black" />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedImage.date}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {selectedImage.location}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {selectedImage.views} views</span>
                <span className="flex items-center gap-1"><HeartIcon size={14} /> {selectedImage.likes} likes</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                  Join Event
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-green-200">Join us and create unforgettable memories at UniManage!</p>
        </div>
      </div>
    </div>
  );
};

export default StudentLife;