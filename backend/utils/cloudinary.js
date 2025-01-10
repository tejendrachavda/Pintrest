import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: 'ddedrs0rk', 
  api_key: '254846417949414', 
  api_secret: 'LqG0D4qlouqhz9JpdVwDiFXRaWg' // Click 'View API Keys' above to copy your API secret
});

const uploadFile = async (file) => {
  try {

    if (!file) {
      console.log("can't find the file" , file);
      return null;
    }

    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });

    console.log("result:", result.url);
  
    const secureurl = result.secure_url;
    const publicId = result.public_id;

    fs.unlinkSync(file)
    
    return{
      secure_url : secureurl,
      public_id : publicId
    }
    
  } catch (error) 
  {
    console.error(error);
    fs.unlinkSync(file);
  }
};

const deletefile = async(file) =>{
  try {

    if (!file) {
      console.log("can't find the file" , file);
      return null;
    }

     await cloudinary.uploader.destroy(file);
    
  } catch (error) {
    console.error(error);
  }
}

export { uploadFile , deletefile};