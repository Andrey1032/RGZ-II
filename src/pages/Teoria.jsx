import Header from "../components/Header";
import PodHeader from "../components/PodHeader1";
import {
    code1,
    code2,
    code3,
    code4,
    code5,
    code7,
    code8,
} from "../components/Code";
import TeoriaContent from "../components/TeoriaContent";

export default function Teoria() {
    return (
        <>
            <Header />
            <PodHeader />
            <div className="help_page">
                <details className="details" name="topics">
                    <summary className="title">
                        Задача коммивояжера (практика-1)
                    </summary>
                    <TeoriaContent src={"code1.pdf"} codes={code1()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        K-means кластеризацию (практика-2)
                    </summary>
                    <TeoriaContent src={"code2.pdf"} codes={code2()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        Композиционное правило Max-min (Практика-3)
                    </summary>
                    <TeoriaContent src={"code3.pdf"} codes={code3()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        Функция принадлежности (Практика-4)
                    </summary>
                    <TeoriaContent src={"code4.pdf"} codes={code4()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        Нейронная сеть (Практика-5)
                    </summary>
                    <TeoriaContent src={"code5.pdf"} codes={code5()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        Расчет групповых оценок мероприятий (Практика-7)
                    </summary>
                    <TeoriaContent src={"code7.pdf"} codes={code7()} />
                </details>
                <details className="details" name="topics">
                    <summary className="title">
                        Принятие решений методом анализа иерархий (Практика-8)
                    </summary>
                    <TeoriaContent src={"code8.pdf"} codes={code8()} />
                </details>
            </div>
        </>
    );
}
