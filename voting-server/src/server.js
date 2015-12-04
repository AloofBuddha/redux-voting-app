import Server from 'socket.io';

export default function startServer(store) {
	const io = Server().attach(8090);

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS());
		socet.on('action', store.dispatch.bind(store));
	});
}