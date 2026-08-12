package com.bank.admin.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class FileUtil {

    private FileUtil() {
    }

    public static void createDirectory(
            String directory)
            throws IOException {

        Path path = Paths.get(directory);

        if (!Files.exists(path)) {

            Files.createDirectories(path);

        }
    }

    public static boolean exists(String path) {

        return Files.exists(Paths.get(path));
    }

}