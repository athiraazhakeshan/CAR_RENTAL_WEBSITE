import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';

configDotenv.config
    // Configuration
    cloudinary.config({ 
        cloud_name: 'dwwa2zs3w', 
        api_key: '253918186893895', 
        api_secret:"FRtqO887NSGgy6Ny14HP1wFTJY4"// Click 'View API Keys' above to copy your API secret
    });
    
   export const cloudinaryInstance = cloudinary