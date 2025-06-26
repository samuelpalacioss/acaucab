package com.ejemplo.reporte_backend;
import java.sql.Connection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;
import java.sql.Date;
import jakarta.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import net.sf.jasperreports.engine.*;

@RestController
public class ReporteController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/reporte")
    public void generarReporte(
            HttpServletResponse response,
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin,
            @RequestParam String nombreReporte
    ) {
        Connection conn = null;
        try {
            InputStream jasperStream = getClass().getResourceAsStream("/"+nombreReporte+".jasper");
            if (jasperStream == null) {
                throw new RuntimeException("No se encontró el archivo "+nombreReporte+ ".jasper");
            }
            Map<String, Object> parametros = new HashMap<>();
            parametros.put("fechaInicio", Date.valueOf(fechaInicio));
            parametros.put("fechaFin", Date.valueOf(fechaFin));

            conn = dataSource.getConnection();
            JasperPrint jasperPrint = JasperFillManager.fillReport(
                jasperStream, parametros, conn
            );

            response.setContentType("application/pdf");
            String fileName = nombreReporte + "_" + fechaInicio + "_a_" + fechaFin + ".pdf";
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
        } finally {
            if (conn != null) {
                try { conn.close(); } catch (Exception ex) { ex.printStackTrace(); }
            }
        }
    }
}