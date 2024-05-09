const Kids = require("../Models/Kidsmodel");
const multer = require('multer');
const path = require('path');

// Create a directory if it doesn't exist
module.exports.kidsUploadImages = async (req, res, next) => {
  try {
    let UploadedfileName = '';
    const filePath = path.join(__dirname + '/kidsImageUpload/Images');
    const Storage = multer.diskStorage({
      destination: filePath,
      filename: (req, file, cb) => {
        const originalname = file.originalname;
        const fileExtension = path.extname(originalname); // Get the file extension
        const uniqueSuffix = Date.now(); // Generate a unique suffix
        const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
        UploadedfileName = '/kidsImageUpload/Images/' + newFilename;
        cb(null, newFilename);
      }
    });

    const upload = multer({ storage: Storage }).single('kids_image');
    upload(req, res, async function (err) {
      if (err) {
        // Handle upload error
        return res.status(500).send('Error uploading file.' + err);
      }
      res.json({ kids: UploadedfileName }); // Send a JSON response
    });
  } catch (error) {
    res.status(500).json({ error: "Error kids Image Upload" + error });
  }
};

module.exports.createKids = async (req, res) => {
  try {
    const {
      kname,
      kdescription,
      kimage,
      kprice,
    } = req.body;

    const newKids = new Kids({
      kname,
      kdescription,
      kimage,
      kprice,
    });

    // Save the new Kids document
    await newKids.save();

    // Send a single response to the client
    res.status(200).json(newKids);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateKids = async (req, res) => {
  const KidsId = req.params.id;

  try {
    // Find the Kids by its ID and update properties based on the request body
    const updatedKids = await Kids.findByIdAndUpdate(
      KidsId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedKids) {
      return res.status(404).json({ message: 'Kids not found' });
    }

    // Send a single response to the client with the updated Kids
    res.status(200).json(updatedKids);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteKids = async (req, res) => {
  const KidsId = req.params.id;

  try {
    // Find the Kids by its ID and delete it
    const deletedKids = await Kids.findByIdAndDelete(KidsId);

    if (!deletedKids) {
      return res.status(404).json({ message: 'Kids not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("Kids deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getKidsById = async (req, res) => {
  const KidsId = req.params.id;

  try {
    // Find the Kids by its ID
    const Kids = await Kids.findById(KidsId);

    if (!Kids) {
      return res.status(404).json({ message: 'Kids not found' });
    }

    // Send a single response to the client with the retrieved Kids
    res.status(200).json(Kids);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllKids = async (req, res) => {
  try {
    // Find all Kidss
    const Kidss = await Kids.find();
    res.status(200).json(Kidss);
  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};
