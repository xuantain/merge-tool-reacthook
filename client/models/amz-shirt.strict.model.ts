export type AMZ_Shirt_Strict = {
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
