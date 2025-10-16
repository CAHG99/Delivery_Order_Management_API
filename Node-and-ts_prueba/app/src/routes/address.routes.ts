import { Router } from 'express';
import * as AddressController from '../controllers/address.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';

const router = Router();

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Obtener lista de todas las direcciones
 *     tags: [Direcciones]
 *     responses:
 *       200:
 *         description: Lista de direcciones obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressResponseDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', AddressController.getAddresses);

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Crear una nueva dirección
 *     tags: [Direcciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressDto'
 *           example:
 *             country: "Colombia"
 *             department: "Atlántico"
 *             city: "Barranquilla"
 *             postal_code: "080001"
 *             street: "Calle 72"
 *             number: "53-80"
 *             is_active: true
 *     responses:
 *       201:
 *         description: Dirección creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateDto(CreateAddressDto), AddressController.createAddress);

/**
 * @swagger
 * /addresses/{id_address}:
 *   get:
 *     summary: Obtener dirección por ID
 *     tags: [Direcciones]
 *     parameters:
 *       - in: path
 *         name: id_address
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_address', AddressController.getAddressById);

/**
 * @swagger
 * /addresses/{id_address}:
 *   put:
 *     summary: Actualizar dirección existente
 *     tags: [Direcciones]
 *     parameters:
 *       - in: path
 *         name: id_address
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAddressDto'
 *     responses:
 *       200:
 *         description: Dirección actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_address', validateDto(UpdateAddressDto), AddressController.updateAddress);

/**
 * @swagger
 * /addresses/{id_address}:
 *   delete:
 *     summary: Eliminar dirección (soft delete)
 *     tags: [Direcciones]
 *     parameters:
 *       - in: path
 *         name: id_address
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección a eliminar
 *     responses:
 *       200:
 *         description: Dirección eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dirección eliminada correctamente
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_address', AddressController.deleteAddress);

export default router;
