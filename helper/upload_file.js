const crypto = require("crypto");
const path = require("path");
const multer = require("multer");

// upload avatar
let file_bytes_avatar=500;
let file_size_avatar=file_bytes_avatar*1024; // 300kb

const config_avatar = {
    fileSize: file_size_avatar, // 500000(5e+5) = 500 Kb, 1000000(1e+6) = 1mb
    fileFilter: function (req, file, callback) {
        let fileSize = parseInt(req.headers['content-length']);
        let mimetype=["image/png","image/jpg","image/jpeg"];
        if (
            !mimetype.includes(file.mimetype)
        ) {
           return callback(new Error("File : Only images are allowed"),false);
        }else if (fileSize > file_size_avatar) {
            return callback(new Error(`File : Maximum photo size ${Math.round(file_size_avatar/1024)} kb`),false);
        }else{
            return callback(null, true);
        }
    },
}

const storage_avatar = multer.diskStorage({
    destination: function (req, file, cb) {
        let path_folder = global.root_dir;
        cb(null, path.join(path_folder + '/uploaded'))
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('md5');
        let format_file=file.originalname.split(".");
        format_file=format_file[format_file.length-1];
        // Generate a random hex string with 8 characters
        const randomHex = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        let avatar_name=`${hash.update(`avatar_${randomHex}_${1}`).digest("hex")}.${format_file}`;
        cb(null,avatar_name);
    }
});

const upload_avatar = multer({ storage: storage_avatar, fileFilter: config_avatar.fileFilter, limits: { fileSize: config_avatar.fileSize } });
// upload avatar

// upload news
let file_bytes_product_image=500;
let file_size_product_image=file_bytes_product_image*1024; // 300kb

const config_product_image = {
    fileSize: file_size_product_image, // 500000(5e+5) = 500 Kb, 1000000(1e+6) = 1mb
    fileFilter: function (req, file, callback) {
        let fileSize = parseInt(req.headers['content-length']);
        let mimetype=["image/png","image/jpg","image/jpeg"];
        if (
            !mimetype.includes(file.mimetype)
        ) {
           return callback(new Error("File : Only images are allowed"),false);
        }else if (fileSize > file_size_product_image) {
            return callback(new Error(`File : Maximum photo size ${Math.round(file_size_product_image/1024)} kb`),false);
        }else{
            return callback(null, true);
        }
    },
}

const storage_product_image = multer.diskStorage({
    destination: function (req, file, cb) {
        let path_folder = global.root_dir;
        cb(null, path.join(path_folder, 'uploaded'))
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('md5');
        let format_file=file.originalname.split(".");
        format_file=format_file[format_file.length-1];
        // Generate a random hex string with 8 characters
        const randomHex = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        let product_image_name=`${hash.update(`product_image_${randomHex}_${1}`).digest("hex")}.${format_file}`;
        cb(null,product_image_name);
    }
});

const upload_product_image = multer({ storage: storage_product_image, fileFilter: config_product_image.fileFilter, limits: { fileSize: config_product_image.fileSize } });
// upload news

module.exports = {
    upload_avatar,upload_product:upload_product_image
};
