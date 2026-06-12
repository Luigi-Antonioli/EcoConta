package EcoConta.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "consumo")
public class Consumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;

    private Double consumoAgua;

    private Double consumoEnergia;

    public Consumo() {
    }

    public Consumo(Long id, LocalDate data, Double consumoAgua, Double consumoEnergia) {
        this.id = id;
        this.data = data;
        this.consumoAgua = consumoAgua;
        this.consumoEnergia = consumoEnergia;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public double getConsumoAgua() {
        return consumoAgua;
    }

    public void setConsumoAgua(Double consumoAgua) {
        this.consumoAgua = consumoAgua;
    }

    public double getConsumoEnergia() {
        return consumoEnergia;
    }

    public void setConsumoEnergia(Double consumoEnergia) {
        this.consumoEnergia = consumoEnergia;
    }
    
}