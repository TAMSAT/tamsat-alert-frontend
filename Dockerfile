FROM mkenney/npm

COPY package.json package-lock.json webpack.config.js .babelrc webpack.config.js index.html TAMSAT_Data_Policy_2017.pdf /build/
COPY src/ /build/src/
WORKDIR /build
RUN npm install
RUN npm run build

# Having built the code on `docker build`, we copy it all to /mnt/www-out when this container runs.
# /mnt/www-out should be the same volume which gets mounted as /app/static by the TAMSAT ALERT container
CMD ["/bin/cp", "-a", "/build/index.html", "/build/TAMSAT_Data_Policy_2017.pdf", "/build/dist/", "/mnt/www-out"]
