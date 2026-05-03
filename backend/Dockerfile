FROM eclipse-temurin:17

WORKDIR /app

COPY Main.java .

CMD sh -c "javac Main.java 2> compile_error.txt && java Main || cat compile_error.txt"