const KEY = 'noon_cart_v1'

export function loadCart(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  }catch{
    return []
  }
}
export function saveCart(items){
  localStorage.setItem(KEY, JSON.stringify(items))
}
export function calcSubtotal(items){
  return items.reduce((sum,it)=> sum + it.price * it.qty, 0)
}
