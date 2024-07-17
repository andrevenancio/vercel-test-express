# vercel-test-express

This repository is an attempt to have a single express server serving both static files (HTML + JS) and express api's.

My initial versions had a `pre-commit` hook which would run `build` and add the `build/` folder to git. That version worked well on vercel. I no longer want to make use of the `pre-commit` hook and I dont want to push the content of the `build` folder to github, however now I'm unable to see a folder on my Output on my vercel application Source tab.
