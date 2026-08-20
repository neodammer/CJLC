# CJL Consulting website

This is a complete multi-page static website for CJL Consulting and The Green Group, presented in the Green Infrastructure & Investment design. It uses plain HTML, CSS and JavaScript, so no installation or build step is required.

## What is included

- Responsive multi-page company website
- Exact seven-item navigation covering Home, About Us, The Green Group, Projects, Investment Opportunities, Management Team and Contact
- Dedicated About, Green Group, Projects, Investment, Management, Company Structure, News and Contact pages
- Dedicated dynamic detail pages for all six divisions, eight listed projects and four management profiles
- Investment-led portfolio overview and project-pipeline metrics
- About, company structure and six Green Group divisions
- Filterable five-year project pipeline
- Investment-opportunity section with a due-diligence disclaimer
- Management-team profiles with the supplied photographs
- Authentic Green Group division marks extracted from the supplied PowerPoint presentations
- A fixed back-to-top control that appears after scrolling
- Netlify-ready contact form and thank-you page
- Original Mauritius renewable-energy hero image
- Original CJL Consulting logo extracted from the supplied company-structure document
- Supplied management photographs

## Check before publishing

1. Confirm all company, project, capex and investment information.
2. Replace the supplied management photographs if higher-resolution approved headshots become available.
3. Confirm the email addresses, telephone numbers and WhatsApp number.
4. Have legal and financial advisers approve the investment wording.
5. Submit a test enquiry after the first Netlify deployment.

## Fastest option: publish directly to Netlify

1. Sign in at https://app.netlify.com/.
2. Choose **Add new project**, then **Deploy manually**.
3. Drag this entire `cjlc-website` folder into the upload area.
4. Wait for the deployment to finish.
5. Open the generated address, which will look similar to `https://your-site-name.netlify.app`.
6. In **Domain management**, choose **Options** or **Edit site name** to select a better Netlify address.
7. Share the public address with anyone.

The form will be detected during deployment. Submitted messages appear under **Forms** in the Netlify dashboard.

## Recommended option: GitHub plus Netlify

This method automatically republishes the website whenever the GitHub files are updated.

### 1. Create the GitHub repository

1. Sign in at https://github.com/.
2. Select the **+** button in the upper-right corner and choose **New repository**.
3. Enter a name such as `cjlc-website`.
4. Choose **Private** while the site is being reviewed, or **Public** if the source code may be visible to everyone.
5. Do not add a README, `.gitignore` or license because this folder already contains the project files.
6. Select **Create repository**.

### 2. Upload the website files

1. On the empty repository page, select **uploading an existing file**.
2. Open the `cjlc-website` folder on the computer.
3. Drag all of its contents into GitHub. The important point is that `index.html` must be at the top level of the repository.
4. Enter a message such as `Add CJLC website`.
5. Select **Commit changes**.

### 3. Connect GitHub to Netlify

1. Sign in at https://app.netlify.com/.
2. Choose **Add new project**, then **Import an existing project**.
3. Select **GitHub** and approve access when requested.
4. Select the `cjlc-website` repository.
5. Leave **Build command** empty.
6. Set **Publish directory** to `.` if `index.html` is at the repository's top level.
7. Select **Deploy**.

Netlify will provide a public `netlify.app` address when deployment is complete.

## Updating the website later

If GitHub is connected, edit or replace the relevant files in GitHub and commit the changes. Netlify will deploy the new version automatically. Check the **Deploys** page to confirm that the update succeeded.

## Using a custom domain

Open the Netlify project, choose **Domain management**, then **Add a domain**. Enter the domain and follow Netlify's DNS instructions. Netlify automatically provides HTTPS after the domain is connected.

## Files

- `index.html` — main company homepage
- `about.html` — company background, mandate and future vision
- `green-group.html` — overview and directory of the six specialist divisions
- `division.html` — reusable dedicated page for each Green Group division
- `projects.html` — filterable project portfolio
- `project.html` — reusable dedicated page for each listed project
- `investment-opportunities.html` — investor qualification, review process and disclaimer
- `management-team.html` — management-team directory
- `profile.html` — reusable full management profile page
- `company-structure.html` — company and division structure map
- `news.html` — approved-news and insights page ready for future content
- `contact.html` — Netlify-ready enquiry form and direct contact details
- `styles.css` — visual design and responsive layout
- `script.js` — navigation, filters, animation and dynamic detail-page content
- `thank-you.html` — confirmation page shown after form submission
- `assets/` — website image assets
- `netlify.toml` — Netlify publishing and security settings
