const fs = require('fs').promises;


// deleteFiles
const deleteFile = filePath => {
      return fs.unlink(filePath);
}

const deleteFiles = (filesArray) => {
      return Promise.all(filesArray.map(file => {
            return deleteFile(file.path)
      }));
}

// Manages files array for PUT requestes.
// Returns updtaed files array, combine new files uploaded with already existing in file storage.

const getUpdatedFilesArr = (originalFilesArr, newFilesArr, newUrlFiles) => {
      let updatedFilesList = [];
      let filesToDelete = [];

      if (Array.isArray(newUrlFiles)) {
            const newUrlFilesName = newUrlFiles.map(newUrlfile => newUrlfile.name)
            updatedFilesList = originalFilesArr.filter(file => {
                  if (newUrlFilesName.includes(file.name)) {
                        return true;
                  } else {
                        filesToDelete.push({Key: file.fileName});
                        return false;
                  }
            })
      } else {
            updatedFilesList = originalFilesArr.filter(file => {
                  if (file.name === newUrlFiles.name) {
                        return true;
                  }
                  filesToDelete.push({Key: newUrlFiles.fileName});
                  return false;
            })
      }

      if (newFilesArr) {
            newFilesArr.forEach(file => {
                  updatedFilesList.push({
                        name: file.originalname,
                        fileName: file.key,
                        url: file.location
                  })
            })
      }

      return { updatedFilesList, filesToDelete };
}

module.exports = {
      deleteFiles,
      getUpdatedFilesArr
}