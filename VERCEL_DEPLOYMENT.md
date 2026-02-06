# Vercel Deployment Instructions

## The project is in a subdirectory called `leap-cbpl`

To deploy correctly, you need to configure Vercel to use the **Root Directory**:

### Option 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **Leap** project
3. Go to **Settings**
4. Scroll to **Build & Development Settings**
5. Set:
   - **Root Directory**: `leap-cbpl`
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
6. Click **Save**
7. Go to **Deployments** tab and click **Redeploy**

### Option 2: Delete vercel.json and Redeploy

The simplest approach is often to configure via the dashboard rather than vercel.json.

After setting the Root Directory, your deployment should work perfectly!
