export type AMZ_APP_SHIRT = {
  feed_product_type?: string,
  item_sku?: string,
  brand_name?: string,
  item_name?: string,
  item_type?: string,
  outer_material_type1?: string,
  color_name?: string,
  color_map?: string,
  department_name?: string,
  size_name?: string,
  size_map?: string,
  is_adult_product?: string,
  standard_price?: number,
  quantity?: number,
  main_image_url?: string,
  other_image_url1: string,
  parent_child?: string,
  parent_sku?: string,
  relationship_type?: string,
  variation_theme?: string,
  product_description?: string,
  bullet_point1?: string,
  bullet_point2?: string,
  bullet_point3?: string,
  bullet_point4?: string,
  generic_keywords?: string,
  fulfillment_latency?: number,
  merchant_shipping_group_name?: string,
}

// NOTE: InputType
// dataType: string/number
// defaulValue: depends on "dataType"
export type InputType = {
  type: '',
  dataType: 'string',
  defaulValue: null,
}

export type APP_TYPE = {
  id: number,
  name?: string,
  addedAt?: number,
  uploadedAt: number,
  recycled?: boolean | false,
  recycledAt: number,
}

export type APP_IMAGE = APP_TYPE & {
  src?: string | ArrayBuffer | WindowBase64,
  type?: string,
  lastModified?: number,
}

export type DESIGN = APP_IMAGE & {
}

export type PATTERN = APP_IMAGE & {
}

export type COLOR = APP_TYPE & {
  hex?: string,
  amz_color_map?: string,
}

export type SIZE = {
  appSize?: string,
  amzSize?: string,
}

export type MUG = APP_TYPE & {
  designId?: number,
  designName?: string,
  patterns?: {
    patternId?: number,
    patternName?: string,
    colors?: COLOR[],
    sizes?: SIZE[],
    data?: AMZ_APP_SHIRT,
  }[],
}

export const AMZ_DEFAULT_ROW = [
  'TemplateType=fptcustom',
  'Version=2019.0519',
  'TemplateSignature=U0hJUlQ=',
  'The top 3 rows are for Amazon.com use only. Do not modify or delete the top 3 rows.'
]

export const AMZ_FIELD_ORDER = [
  ['feed_product_type','Product Type'],
  ['item_sku','Seller SKU'],
  ['brand_name','Brand Name'],
  ['item_name','Product Name'],
  ['item_type','Item Type Keyword'],
  ['outer_material_type1','Outer Material Type'],
  ['color_name','Color'],
  ['color_map','Color Map'],
  ['department_name','Department'],
  ['size_name','Size'],
  ['size_map','Size Map'],
  ['is_adult_product','Is Adult Product'],
  ['standard_price','Standard Price'],
  ['quantity','Quantity'],
  ['main_image_url','Main Image URL'],
  ['other_image_url1','Other Image URL1'],
  ['parent_child','Parentage'],
  ['parent_sku','Parent SKU'],
  ['relationship_type','Relationship Type'],
  ['variation_theme','Variation Theme'],
  ['product_description','Product Description'],
  ['bullet_point1','Key Product Features'],
  ['bullet_point2','Key Product Features'],
  ['bullet_point3','Key Product Features'],
  ['bullet_point4','Key Product Features'],
  ['generic_keywords','Search Terms'],
  ['fulfillment_latency','Handling Time'],
  ['merchant_shipping_group_name','Shipping-Template'],
]
