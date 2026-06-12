package EcoConta.api.service;

import EcoConta.api.model.Consumo;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class KNNService {

    private final ConsumoService consumoService;

    public KNNService(ConsumoService consumoService) {
        this.consumoService = consumoService;
    }

    public String classificarPerfil(double agua, double energia) {

        List<Consumo> dados = consumoService.listarTodos();

        if (dados == null || dados.isEmpty()) {
            return "Sem dados suficientes para classificação";
        }

        int k = Math.min(3, dados.size());

        int countBaixo = 0;
        int countMedio = 0;
        int countAlto = 0;

        dados.sort(Comparator.comparingDouble(c ->
                calcularDistancia(c, agua, energia)
        ));

        for (int i = 0; i < k; i++) {

            Consumo c = dados.get(i);

            double consumoAgua = c.getConsumoAgua();
            double consumoEnergia = c.getConsumoEnergia();

            if (consumoAgua < 150 && consumoEnergia < 150) {
                countBaixo++;
            } else if (consumoAgua < 300 && consumoEnergia < 300) {
                countMedio++;
            } else {
                countAlto++;
            }
        }

        if (countAlto >= countMedio && countAlto >= countBaixo) {
            return "Alto consumo";
        } else if (countMedio >= countBaixo) {
            return "Consumo moderado";
        } else {
            return "Consumo econômico";
        }
    }

    private double calcularDistancia(Consumo c, double agua, double energia) {
        return Math.sqrt(
                Math.pow(c.getConsumoAgua() - agua, 2) +
                Math.pow(c.getConsumoEnergia() - energia, 2)
        );
    }

    public String gerarRecomendacao(String perfil) {

        switch (perfil) {
            case "Alto consumo":
                return "Seu consumo está alto. Verifique possíveis desperdícios de água e energia.";

            case "Consumo moderado":
                return "Seu consumo está dentro da média. Tente reduzir pequenos excessos.";

            case "Consumo econômico":
                return "Parabéns! Seu consumo está eficiente e sustentável.";

            default:
                return "Sem recomendação disponível.";
        }
    }
}