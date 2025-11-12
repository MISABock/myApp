FROM eclipse-temurin:21-jdk

WORKDIR /app

# Nur die Dateien kopieren, die du wirklich brauchst
COPY build.gradle settings.gradle gradlew ./
COPY gradle gradle
COPY src src

# Gradle Wrapper ausführbar machen
RUN chmod +x gradlew

# Projekt bauen (ohne Tests)
RUN ./gradlew build -x test

# Port öffnen
EXPOSE 8080

# Die gebaute JAR starten
CMD ["java", "-jar", "build/libs/demo-0.0.1-SNAPSHOT.jar"]
