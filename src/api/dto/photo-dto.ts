export interface Photo {
  id: string;
  photo_id: string;
  photo_url: string;
  photo_image_url: string;
  photo_submitted_at: string; // ISO timestamp
  photo_featured: boolean;
  photo_width: number;
  photo_height: number;
  photo_aspect_ratio: number;
  photo_description?: string;
  photographer_username: string;
  photographer_first_name: string;
  photographer_last_name?: string;
  exif_camera_make?: string;
  exif_camera_model?: string;
  exif_iso?: number;
  exif_aperture_value?: number;
  exif_focal_length?: number;
  exif_exposure_time?: string;
  photo_location_name?: string;
  photo_location_latitude?: number;
  photo_location_longitude?: number;
  photo_location_country?: string;
  photo_location_city?: string;
  stats_views: number;
  stats_downloads: number;
  ai_description?: string;
  ai_primary_landmark_name?: string;
  ai_primary_landmark_latitude?: number;
  ai_primary_landmark_longitude?: number;
  ai_primary_landmark_confidence?: number;
  blur_hash?: string;
}

export interface Keyword {
  photo_id: string;
  keyword: string;
  ai_service_1_confidence?: number; // 0-100
  ai_service_2_confidence?: number; // 0-100
  suggested_by_user: boolean;
}

export interface Collection {
  photo_id: string;
  collection_id: string;
  collection_title: string;
  photo_collected_at: string; // ISO timestamp
}

export interface Conversion {
  converted_at: string; // ISO timestamp
  conversion_type: 'download';
  keyword: string;
  photo_id: string;
  anonymous_user_id: string;
  conversion_country: string; // Country code
}

export interface Color {
  photo_id: string;
  hex: string;
  red: number;
  green: number;
  blue: number;
  keyword: string;
  coverage: number; // Percentage
  score: number;
}

export interface SearchImageReponse {
  total: number;
  limit: number;
  skip: number;
  metadata: ({ id: string; score: string } & Photo)[];
}

export interface UserImage {
  id: string;
  user_uuid: string;
  public_url: string;
  file_name: string;
  file_size?: number | null;
  format?: string | null;
  width?: number | null;
  height?: number | null;
  created_at: string;
  expire_at?: string | null;
  cloud_provider: 'AMAZON_S3'; // Extend if needed
}
