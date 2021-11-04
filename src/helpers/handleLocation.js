export default function handleLocation(location) {
  const { pathname } = location;
  let type = '';
  if (pathname.includes('comidas')) type = 'comidas';
  if (pathname.includes('bebidas')) type = 'bebidas';
  return type;
}
