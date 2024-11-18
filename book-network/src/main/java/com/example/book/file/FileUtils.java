package com.example.book.file;

import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
public class FileUtils {
    public static String readFileFromLocation(String fileUrl) {
        if (StringUtils.isBlank(fileUrl)) {
            log.warn("File URL is blank");
            return null;
        }
        try {
            Path filePath = new File(fileUrl).toPath();
            // Convert byte[] to String using UTF-8 encoding
            return new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.warn("No file found in the path {}. Exception: {}", fileUrl, e.getMessage());
        }
        return null;
    }
}
