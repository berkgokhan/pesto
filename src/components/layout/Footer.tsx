export default function Footer() {
  return (
    <footer className='w-full mt-12 py-6 flex flex-col items-center justify-center border-t border-surface-container text-on-surface-variant text-sm'>
      <span>&copy; {new Date().getFullYear()} Pesto. All rights reserved.</span>
    </footer>
  );
}
