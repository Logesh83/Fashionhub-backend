const women = require("../Models/Womenmodel");
const multer = require('multer');
const path = require('path');

// Create a directory if it doesn't exist
module.exports.womenUploadImages = async (req, res, next) => {
  try {
    let UploadedfileName = '';
    const filePath = path.join(__dirname + '/womenImageUpload/Images');
    const Storage = multer.diskStorage({
      destination: filePath,
      filename: (req, file, cb) => {
        const originalname = file.originalname;
        const fileExtension = path.extname(originalname); // Get the file extension
        const uniqueSuffix = Date.now(); // Generate a unique suffix
        const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
        UploadedfileName = '/womenImageUpload/Images/' + newFilename;
        cb(null, newFilename);
      }
    });

    const upload = multer({ storage: Storage }).single('women_image');
    upload(req, res, async function (err) {
      if (err) {
        // Handle upload error
        return res.status(500).send('Error uploading file.' + err);
      }
      res.json({ women: UploadedfileName }); // Send a JSON response
    });
  } catch (error) {
    res.status(500).json({ error: "Error women Image Upload" + error });
  }
};
module.exports.createWomen = async (req, res) => {
  try {
    const {
      wname,
      wdescription,
      wimage,
      wprice,
    } = req.body;

    const newwomen = new women({
      wname,
      wdescription,
      wimage,
      wprice,
    });

    // Save the new women document
    await newwomen.save();

    // Send a single response to the client
    res.status(200).json(newwomen);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateWomen = async (req, res) => {
  const womenId = req.params.id;

  try {
    // Find the women by its ID and update properties based on the request body
    const updatedwomen = await women.findByIdAndUpdate(
      womenId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedwomen) {
      return res.status(404).json({ message: 'women not found' });
    }

    // Send a single response to the client with the updated women
    res.status(200).json(updatedwomen);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteWomen = async (req, res) => {
  const womenId = req.params.id;

  try {
    // Find the women by its ID and delete it
    const deletedwomen = await women.findByIdAndDelete(womenId);

    if (!deletedwomen) {
      return res.status(404).json({ message: 'women not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("women deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getWomenById = async (req, res) => {
  const womenId = req.params.id;

  try {
    // Find the women by its ID
    const women = await women.findById(womenId);

    if (!women) {
      return res.status(404).json({ message: 'women not found' });
    }

    // Send a single response to the client with the retrieved women
    res.status(200).json(women);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllWomen = async (req, res) => {
  try {
    // Find all womens
    const womens = await women.find();
    res.status(200).json(womens);
  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};
