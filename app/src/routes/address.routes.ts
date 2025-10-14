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
 *                 $ref: '#/components/schemas/AddressDto'
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
 *               $ref: '#/components/schemas/AddressDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, validateDto(CreateAddressDto), AddressController.createAddress);

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
 *               $ref: '#/components/schemas/AddressDto'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_address', authenticate, AddressController.getAddressById);

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
 *               $ref: '#/components/schemas/AddressDto'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_address', authenticate, validateDto(UpdateAddressDto), AddressController.updateAddress);

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
router.delete('/:id_address', authenticate, AddressController.deleteAddress);

/**
 * @swagger
 * /addresses/search:
 *   get:
 *     summary: Buscar direcciones con filtros (ciudad, código postal, país)
 *     tags: [Direcciones]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filtro por ciudad
 *       - in: query
 *         name: postalCode
 *         schema:
 *           type: string
 *         description: Filtro por código postal
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filtro por país
 *     responses:
 *       200:
 *         description: Resultados de búsqueda de direcciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressDto'
 *       500:
 *         description: Error interno del servidor
 */

export default router;
