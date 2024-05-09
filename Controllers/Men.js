const men = require("../Models/Menmodel");
const multer = require('multer');
const path = require('path');

// Create a directory if it doesn't exist
module.exports.menUploadImages = async (req, res, next) => {
  try {
    let UploadedfileName = '';
    const filePath = path.join(__dirname + '/menImageUpload/Images');
    const Storage = multer.diskStorage({
      destination: filePath,
      filename: (req, file, cb) => {
        const originalname = file.originalname;
        const fileExtension = path.extname(originalname); // Get the file extension
        const uniqueSuffix = Date.now(); // Generate a unique suffix
        const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
        UploadedfileName = '/menImageUpload/Images/' + newFilename;
        cb(null, newFilename);
      }
    });

    const upload = multer({ storage: Storage }).single('men_images');
    upload(req, res, async function (err) {
      if (err) {
        // Handle upload error
        return res.status(500).send('Error uploading file.' + err);
      }
      res.json({ men: UploadedfileName }); // Send a JSON response
    });
  } catch (error) {
    res.status(500).json({ error: "Error men Image Upload" + error });
  }
};



module.exports.createMen = async (req, res) => {
  try {
    const {
      mname,
      mdescription,
      mimage,
      mprice,
    } = req.body;

    const newmen = new men({
      mname,
      mdescription,
      mimage,
      mprice,
    });

    // Save the new men document
    await newmen.save();

    // Send a single response to the client
    res.status(200).json(newmen);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateMen = async (req, res) => {
  const menId = req.params.id;

  try {
    // Find the men by its ID and update properties based on the request body
    const updatedmen = await men.findByIdAndUpdate(
      menId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedmen) {
      return res.status(404).json({ message: 'men not found' });
    }

    // Send a single response to the client with the updated men
    res.status(200).json(updatedmen);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteMen = async (req, res) => {
  const menId = req.params.id;

  try {
    // Find the men by its ID and delete it
    const deletedmen = await men.findByIdAndDelete(menId);

    if (!deletedmen) {
      return res.status(404).json({ message: 'men not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("men deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMenById = async (req, res) => {
  const menId = req.params.id;

  try {
    // Find the men by its ID
    const men = await men.findById(menId);

    if (!men) {
      return res.status(404).json({ message: 'men not found' });
    }

    // Send a single response to the client with the retrieved men
    res.status(200).json(men);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllMens = async (req, res) => {
  try {
    // Find all mens
    const mens = await men.find();
    res.status(200).json(mens);
  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};
