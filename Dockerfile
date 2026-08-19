# The game is plain HTML, CSS and JavaScript with no build step, so a single
# stage that copies the files into nginx is all it needs.
#
# The base image is pinned by digest — a tag is a moving target, and the same
# commit should build the same image later. This manifest carries linux/arm64,
# which is what the server runs on.
FROM nginx:alpine@sha256:4a73073bd557c65b759505da037898b61f1be6cbcc3c2c3aeac22d2a470c1752

# Replaces the stock server block. The default one serves the files but sets no
# caching at all, so every reload pulls all six megabytes of sprites and audio
# again.
COPY default.conf /etc/nginx/conf.d/default.conf

# Copied one by one instead of "COPY . ." so that only what belongs on the web
# actually ends up there. A stray note or config file added to the repo later
# cannot leak into the document root by accident.
COPY index.html impressum.html style.css favicon.png /usr/share/nginx/html/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/
COPY audio/ /usr/share/nginx/html/audio/
COPY fonts/ /usr/share/nginx/html/fonts/

# Fails the build instead of the deploy if the config above has a mistake in it.
RUN nginx -t

EXPOSE 80
