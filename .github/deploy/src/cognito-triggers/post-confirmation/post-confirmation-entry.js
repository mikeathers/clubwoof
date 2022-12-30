"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const add_user_to_group_1 = require("./add-user-to-group");
async function main(event, _context, callback) {
    const { userPoolId, userName: username } = event;
    try {
        await (0, add_user_to_group_1.addUserToGroup)({
            userPoolId,
            username,
            groupName: 'Users',
        });
        return callback(null, event);
    }
    catch (error) {
        return callback(error, event);
    }
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1jb25maXJtYXRpb24tZW50cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0LWNvbmZpcm1hdGlvbi1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBb0Q7QUFFN0MsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFtQyxFQUFFLFFBQWlCLEVBQUUsUUFBa0I7SUFDbkcsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBRWhELElBQUk7UUFDRixNQUFNLElBQUEsa0NBQWMsRUFBQztZQUNuQixVQUFVO1lBQ1YsUUFBUTtZQUNSLFNBQVMsRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQTtRQUNGLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtLQUM3QjtJQUFDLE9BQU8sS0FBVSxFQUFFO1FBQ25CLE9BQU8sUUFBUSxDQUFDLEtBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQTtLQUN2QztBQUNILENBQUM7QUFiRCxvQkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGxiYWNrLCBDb250ZXh0LCBQb3N0Q29uZmlybWF0aW9uVHJpZ2dlckV2ZW50IH0gZnJvbSAnYXdzLWxhbWJkYSdcbmltcG9ydCB7IGFkZFVzZXJUb0dyb3VwIH0gZnJvbSAnLi9hZGQtdXNlci10by1ncm91cCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1haW4oZXZlbnQ6IFBvc3RDb25maXJtYXRpb25UcmlnZ2VyRXZlbnQsIF9jb250ZXh0OiBDb250ZXh0LCBjYWxsYmFjazogQ2FsbGJhY2spOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyB1c2VyUG9vbElkLCB1c2VyTmFtZTogdXNlcm5hbWUgfSA9IGV2ZW50XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBhZGRVc2VyVG9Hcm91cCh7XG4gICAgICB1c2VyUG9vbElkLFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBncm91cE5hbWU6ICdVc2VycycsXG4gICAgfSlcbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgZXZlbnQpXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgYXMgRXJyb3IsIGV2ZW50KVxuICB9XG59XG4iXX0=