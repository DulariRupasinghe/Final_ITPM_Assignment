const Setting = require('../models/Setting');

// @desc    Get all settings
// @route   GET /api/settings
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });
    res.json({ success: true, settings: settingsObject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value, category: getCategory(key), updatedBy: req.user?.id },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategory = (key) => {
  if (key.includes('theme') || key.includes('dark') || key.includes('color')) return 'appearance';
  if (key.includes('notification')) return 'notifications';
  if (key.includes('language')) return 'language';
  if (key.includes('security')) return 'security';
  return 'general';
};

// @desc    Initialize default settings
// @route   POST /api/settings/init
const initSettings = async (req, res) => {
  try {
    const defaultSettings = {
      siteName: 'UniManage',
      siteEmail: 'info@unimanage.edu',
      sitePhone: '+1 (555) 123-4567',
      siteAddress: '123 University Avenue, City, State 12345',
      theme: 'light',
      primaryColor: 'green',
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'UTC-5',
      autoBackup: true,
      sessionTimeout: 30,
    };
    
    for (const [key, value] of Object.entries(defaultSettings)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value, category: getCategory(key) },
        { upsert: true, new: true }
      );
    }
    
    res.json({ success: true, message: 'Default settings initialized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings, initSettings };
