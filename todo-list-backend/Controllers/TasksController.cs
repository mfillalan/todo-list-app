using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly IMongoCollection<Task> _tasks;

    public TasksController(IConfiguration config, IMongoClient mongoClient)
    {
        var database = mongoClient.GetDatabase(config.GetSection("MongoDbSettings:DatabaseName").Value);
        _tasks = database.GetCollection<Task>("Tasks");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
    {
        var tasks = await _tasks.Find(task => true).ToListAsync();
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<ActionResult<Task>> CreateTask(Task task)
    {
        task.Id = Guid.NewGuid().ToString();
        task.IsCompleted = false;
        await _tasks.InsertOneAsync(task);
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateTask(string id, Task updatedTask)
    {
        var task = await _tasks.Find(t => t.Id == id).FirstOrDefaultAsync();
        if (task == null) return NotFound();
        updatedTask.Id = id;
        await _tasks.ReplaceOneAsync(t => t.Id == id, updatedTask);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var result = await _tasks.DeleteOneAsync(t => t.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}