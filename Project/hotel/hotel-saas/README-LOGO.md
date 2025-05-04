# Logo Implementation Instructions

Follow these steps to implement your custom logo in the HotelEase website:

## 1. Add Logo Files

You need to add your logo image files in two places:

### For the Browser Tab (Favicon)

1. Rename your logo image to `favicon.ico`
2. Replace the existing file at `public/favicon.ico`

### For the Navbar Logo

1. Create a logo image file named `logo.png`
2. Place it in the `public/images/` directory
   - Create this directory if it doesn't exist: `mkdir -p public/images`

## 2. Logo Size Requirements

- Favicon: 32×32 or 64×64 pixels (square format)
- Navbar logo: Approximately 40px height, with appropriate width (keep aspect ratio)

## 3. Rebuild and Deploy

After adding the logo files, rebuild and redeploy your application:

```bash
npm run build
firebase deploy --only hosting
```

## 4. Verify the Implementation

1. Visit your website at [https://hotel-saas.web.app](https://hotel-saas.web.app)
2. Check that the logo appears in:
   - The browser tab
   - The navbar at the top of your site

## Notes

- The logo in the navbar is set to a height of 40px (h-10 in Tailwind CSS)
- If you need to adjust the size, modify the `className="h-10 mr-2"` in the Navbar.jsx file 