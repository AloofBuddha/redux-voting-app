import Server from 'socket.io';

export default function startServer(store) {
	const io = Server(8090);

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));
	});
}