const router = require("express").Router();
const fs = require("fs");

const authenticator = require("./middleware/authenticator");

const File = require("../models/fileModel");
const Image = require("../models/imageModel");

router.post(
  "/",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    try {
      if (!req.files) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        let image = req.files.image;
        let image_data = {
          user_id: req.decodedToken.userId,
          public: req.body.public,
          metadata: req.body.metadata,
        };
        Image.add(image_data)
          .then((new_image) => {
            const new_image_id = new_image.file_uuid;
            File.add(image, new_image_id)
              .then((resp) => {
                if (!resp) {
                  res.status(201).json({ message: "Image uploaded." });
                } else {
                  res.status(500).json({ error: resp });
                }
              })
              .catch((err) => {
                res.status(500).json({ errorMessage: err.message });
              });
          })
          .catch((err) => {
            res.status(500).json({ errorMessage: err.message });
          });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Image.findById(id)
        .then(img => {
            if (img.public || img.user_id === req.decodedToken.userId) {
                res.download("/images" + id, id, err => {
                    if (err) {
                        res.status(500).json({ error: err });
                    }
                });
            } else {
                res.status(403).json({ message: "User does not have access to this image." })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.get("/", (req, res) => {
    const filter = req.body.filter;
    Image.findBy(filter)
        .then(images => {
            const sendable = images.filter(i => (i.public || i.user_id === req.decodedToken.userId));
            res.status(200).json({ images: sendable });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Image.findById(id)
        .then(img => {
            if (img.user_id === req.decodedToken.userId) {
                File.unlink(img.file_uuid)
                    .then(resp => {
                        if (!resp) {
                            Image.remove(id)
                                .then(removed => {
                                    res.status(200).json({ message: "Image deleted." });
                                })
                                .catch(err => {
                                    res.status(500).json({ message: "Error removing image from db." });
                                })
                        } else {
                            res.status(500).json({ message: "Error unlinking image." });
                        }
                    })
            } else {
                res.status(403).json({ message: "Cannot delete image uploaded by other user." });
            }
        })
})

module.exports = router;