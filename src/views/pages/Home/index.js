import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  FloatingLabel,
  Row,
  Col,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { requisicaoService } from "../../../services/requisicaoService";
import { lancheService } from "../../../services/lancheService";
import { useForm } from "react-hook-form";
import { requisicaoModel } from "../../../models/requisicaoModel";
import { usuarioService } from "../../../services/usuarioService";
import { ToastSuccess, ToastError } from "../../components/Toast/toasts";
import DeleteIcon from "@mui/icons-material/Delete";

export function HomeIndex() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [lanches, setLanches] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reqID, setReqID] = useState();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getRequisicoes();
    getLanches();
    getUsuarios();
    console.log(typeof reqID);
  }, [reqID]);

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    let idRequest = parseInt(id);
    setReqID(idRequest);

    setShowDelete(true);
  };

  const requisicaoForm = useForm({
    defaultValues: requisicaoModel.createRequisicao(),
  });

  function getUsuarios() {
    usuarioService
      .getUsuarios()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getLanches() {
    lancheService
      .getLanches()
      .then((response) => {
        setLanches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getRequisicoes() {
    requisicaoService
      .getRequisicoes()
      .then((response) => {
        setRequisicoes(response.data);
        ToastSuccess();
      })
      .catch((error) => {
        console.log(error);
        ToastError();
      });
  }

  function addRequisicao() {
    const form = { ...requisicaoForm.getValues() };
    requisicaoService
      .addRequisicao(form)
      .then((response) => {
        alert("Cadastro de lanche realizado com sucesso, bon appétit!");
        requisicaoForm.reset(requisicaoModel.createRequisicao());
        console.log("Did it work!");
        getRequisicoes();
      })
      .catch((error) => {
        alert("Algo deu errado, confira seu formulário.");
        console.log(error);
      });
  }

  function deleteRequisicao() {
    requisicaoService
      .deleteRequisicao(reqID)
      .then((response) => {
        alert("Requisição deletada com sucesso!");
        closeDeleteModal();
        getRequisicoes();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  return (
    <Container>
      <div className="mb-4">
        <h4 className="mb-4">E aí. O que temos pra hoje? ;) </h4>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingSelect"
              label="Selecione o que irá levar"
            >
              <Form.Select {...requisicaoForm.register("lanche")}>
                <>
                  <option value="Café">Café</option>
                  <option value="Pão">Pão</option>
                  <option value="Queijo">Queijo</option>
                  <option value="Presunto">Presunto</option>
                  <option value="Salada">Salada</option>
                  <option value="Suco de Laranja">Suco de Laranja</option>
                  <option value="Suco de Maracujá">Suco de Maracujá</option>
                  <option value="Suco de Manga">Suco de Manga</option>
                  <option value="Tampico">Tampico</option>
                </>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSelect" label="Colaborador">
              <Form.Select>
                {usuarios.map((item) => (
                  <>
                    <option
                      {...requisicaoForm.setValue("funcionario", item.nome)}
                      {...requisicaoForm.getValues("funcionario")}
                      value={item.nome}
                    >
                      {item.nome}
                    </option>
                  </>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md className="align-self-center">
            <Button
              variant="primary"
              className="text-center"
              onClick={addRequisicao}
            >
              Escolher
            </Button>
          </Col>
        </Row>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lanche</th>
            <th>Colaborador</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {requisicoes.map((item, index) => (
            <tr key={index}>
              <td colSpan="1">{item.id}</td>
              <td colSpan="1">{item.lanche}</td>
              <td>{item.funcionario}</td>
              <td className="text-center">
                <Button
                  variant="outline-danger"
                  onClick={() => showDeleteModal(item.id)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Delete modal */}
      <Modal centered show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete de requisição</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está deletando sua requisição de lanche, tem certeza disso?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteRequisicao}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
