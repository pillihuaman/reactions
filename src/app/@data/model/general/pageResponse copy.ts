// page-request.model.ts

import { Menu } from "./menu";

export interface PageRequest {
  id?: string;
  title?: string;
  content?: string;
  url?: string;
  parentMenu?: Menu;
  isPublished?: boolean;
  metaKeywords?: string;
  metaDescription?: string;
}
